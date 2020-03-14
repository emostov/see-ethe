# See the Ethe

###### [Live Site](https://see-ethe.herokuapp.com/#/home)


## Table of Contents

* [Background](#background)
* [Technologies](#technologies)
* [Features](#features)

---

## Background

###### [Jump to Technologies](#technologies)

See The Ethe, an Etherscan clone, is a blockchain explorer that providesdat live data feeds for blocks and transactions, network health overview, detailed block show pages, block search bar, and smart contract Read and Write interactions with MetaMask. A user can sign up, login, or use a demo login. However, following the ethos of privacy the App does not require login to use any of the key features.

This site uses Ruby On Rails and PostgreSQL for the backend to store user and session info, and account tags. React + Redux was utilized to create a performant single page web app implemented with future scalability in mind. The App fetches directly from an Infura node to provide real time updates on blocks, transactions, and smart contracts. Web3js is used as a convenience library to interface with the contract and Infura. To facilitate transaction signatures for smart contract Write operations the App integrates with the chrome MetaMask extension.

---

## Technologies
###### [Jump to Features](#feature-highlights)

* Ethereum main-net and Rinkeby test-net
* Web3js
* Infura
* MetaMask
* Reactjs
* Reduxjs
* Nodejs
* Ruby on Rails
* PostgreSQL
* Webpack
* Heroku

---

## Feature Highlights

### Live Block and Transaction Feeds
###### [Jump to Next Feature Highlight](#direct-contract-interaction-and-metamask-integration)

##### Overview

* Block requests use the Web3js batch feature to provide synchronous behaviour in order to avoid sorting on reciept. The sync-like batched requests have a performance hit for response time, but a batched request is only used once on the initial React component mount and all subsequent requests are for single blocks.
* A block reward field is initially set to a baseline of 2 Eth + relevant uncle.
* Full transaction objects are included in block requests to avoid a N+1 fetch.
* After the reciept of a block, a transaction reciept is fetched for each transaction in order to obtain the exact amount of gas used in processing the transaction. Upon succesful retrieval the reciept is merged with the transaction object and the actual wei payed for gas for the used gas is calculated.
* The block reward is incremented every time a transaction reciept is recieved.
* Clicking on the block number and any other of the blue links in either of the feeds will take the user to the detailed show page for the respective block

##### Challenges

The major challenge was fetching transaction reciepts and then calculating block reward in a performant manner that would not diminish user exprience. Below I elaborate on the issues of my initial and naive implementation, followed by key sections of code from the current strategy.

The initial implementation of the redux cycle and associated calculations suffered from major performance issues that would delay user interaction. The initial flow was something like:

* Fetch blocks with associated transactions.
* Fetch associated transaction reciept for each transaction.
* Combine reciept and transaction object.
* On re-render, while mapping over blocks, calculate each block reward so it updates with each transaction reciept.
* Once a block hits an arbirtrary age (i.e 30 seconds), save the reward as a block attribute, dispatch to state, and skip future reward calculations

__Bottlenecks with the aformentioned flow:__

* Big.js number calculations on every render block the stack and hinder real time page interaction.
* Redundant calculations are made since they are done based on renders and not when the relevent information is recieved.
* Picking an arbitrary age to stop updates can result in incomplete results.
* Dispatching an action from the render cycle does not follow React philosophy.

__Solution:__

Decouple reward updates from the render cycle.

In order to do this I created additional callbacks for calculating and dispatching updated transaction gas costs and updated block rewards. These are then threaded down starting with the initial fetch of the block. This process elimated redundant Big.js calculations and instead saves each calculation to state so they can be asynchronously built upon.

##### Code highlights for the above solution

```javascript
// web3_util.js

// general connection setup for main-net which is the basis for the feed
export const web3 = new Web3(new Web3.providers.HttpProvider(infuraEndPoint));

// Fetch N of the latest blocks and providecallback for handling processing
export const getNLatestBlocks = (n, processBlockCB) => {
  // Get block number of the most recent block
  web3.eth.getBlockNumber().then((latestBlockNum) => {
    const blockRange = range(latestBlockNum - n, latestBlockNum + 1);

    // Create a batched request object
    const batch = new web3.BatchRequest();

    // Request that full transaction objects are included in block request
    // (opposed to just having the transaction hash)
    const returnTransactionObjects = true;
    blockRange.forEach((blockNum) => {

      // Each request added to the batch includes a callback that will handle
      // state insertion, transactionReciept fetching, transaction updates
      // with the reciept and cost of actual gas used, and calculations to
      // update block reward
      batch.add(web3.eth.getBlock.request(
        blockNum,
        returnTransactionObjects,
        processBlockCB,
      ));
    });
    batch.execute();
  });
};

// Pull apart transaction objects from blocks and set block reward
// This function is used prior to insertion in state via the receiveBlockAction()
export const extractTxnObjectsFromBlock = (block) => {
  const { transactions } = block;
  const newBlock = { ...block };
  // Check that the array of transactions objects is not malformed
  if ((typeof transactions[0] === 'object' && transactions[0] !== null)) {
    const txnsObject = {};
    const txnsHashArray = [];

    // Create object of all transactions with correct redux state shape
    transactions.forEach((txn) => {
      txnsHashArray.push(txn.hash);
      txnsObject[txn.hash] = txn;
    });

    // Assign new block an array of transactions hashes instead of transaction
    // objects to keep state flat
    newBlock.transactions = [...txnsHashArray];

    // Set base and uncle reward
    const baseReward = new Big(newBlock.uncles.length * (2 / 32), 10)
      .add(new Big(2, 10)).toString();
    newBlock.reward = baseReward;
    return { txnsObject, txnsHashArray, block: newBlock };
  }

  // Return something to key into to prevent undefined errors later
  return { txnsObject: {}, txnsHashArray: {}, block };
};
```

```javascript
// web3_actions.js (actions for the redux cycle and relevant methods)

// Takes in the quantity of blocks to fetch and later takes in dispatch and
// getStore so they can be past to downstream callbacks via processBlock()
export const fetchBlocks = (quantity) => (dispatch, getStore) => {
  const processBlockDispatch = processBlock(dispatch, getStore);
  Web3Util.getNLatestBlocks(quantity, processBlockDispatch);
};

// Passed as a callback for each block when the blocks are being batched
// (*see getNLatestBlocks() to look at batching)
const processBlock = (dispatch, getState) => (err, block) => {

  const fetchTxRecieptDispatch = fetchTransactionReciept(dispatch, getState);
  if (!err) {
    const { blocks } = getState().entities;

    // Make sure the block does not already exist to prevent redundant fetches
    // and the computionally expensive work of calculating block reward
  if (blocks[block.hash] !== undefined) return;

    // Pass the dispatched version of fetchTransactionReciept() so it can be
    // used later on when looping through the blocks transactions.
    dispatch(receiveBlock(block, fetchTxRecieptDispatch));
  } else {
    console.error('Block reciept ERROR: ', err);
  }
};

// Takes in dispatch and getState in order to fetch a transaction reciept for
// the given transactionHash. This function is passed as callback to receive
// block
export const fetchTransactionReciept = (dispatch, getState) => (txHash) => (
  Web3Util.getTransactionReciept(txHash)
    .then((txReceipt) => {

      // If the return object is not null do not continue
      if (!txReceipt) {
        return;
      }

      // Dispatch reciept so it can be merged with relevant transaction and
      // inserted into state. This will calculate and add the total cost of the
      // gas use to the transaction so it can be refferenced later when
      // calculating block reward
      dispatch(receiveTransactionReciept(txReceipt));
      const { blockHash, transactionHash } = txReceipt;
      const { blocks, transactions } = getState().entities;
      const block = blocks[blockHash];
      const transaction = transactions[transactionHash];

      // Calculate an updated
      const reward = calculateUpdatedRewad(block, transaction);
      dispatch(updateBlockReward(block.hash, reward));
    })
);
```

```javascript
// web3_util.js (cost of gas used & reward update functions)

// Once the transaction reciept is merged with the original transaction
// this function is called in order to calculate the costOfGasUsed and add it as
// an attribute of the transaction object so it can be saved in state
const calcGasUsed = (txObj) => {
  const { gasUsed, gasPrice } = txObj;
  const newTxObj = { ...txObj };
  newTxObj.costOfGasUsed = parseInt(gasPrice, 10) * parseInt(gasUsed, 10);
  return newTxObj;
};

// This function calculates the updated reward for the block once the transaction
// receipt has been merged into it's respective transaction. It is important for
// performance to minimize the amount of times Big.js arithmetic is completed so
// this function is only called once per transaction and is decoupled from the
// rendering process
export const calculateUpdatedRewad = (block, transaction) => {

  // When block does not exist still return 2 in case dependent functions
  // need a baseline reward
  if (!block) return '2';

  // Check to make sure the received transaction is not null before continuing
  if (block.reward && !transaction) return block.reward;
  const costEthe = web3.utils.fromWei(
    transaction.costOfGasUsed.toString(),
    'ether',
  );

  // Convert the string into a Big.js number in order to handle arithmetic
  // that could overflow the native javascript integer
  const bigCost = new Big(costEthe, 10);

  // if for some reason block does not have reward assume its the baseline of 2
  const blockReward = block.reward ? block.reward : 2;
  const bigReward = new Big(blockReward, 10).toString();
  const newReward = bigCost.add(bigReward);
  return newReward.toString();
}
```

---

### Direct Contract Interaction and MetaMask Integration

##### Overview

* Facilitates call (read) and send (write) interactions with smart contracts
* MetaMask is used for write interactions to sign transactions and set gas
* After a succesful write a link to the relevant transaction shows up as a button
* Currently available for the Rinkeby test-net so the feature can be demoed with no real risk
* At the moment the feature is only available for the Wrapped Ether (wEth) smart contract
* The Wrapped Eth contract facilatates a one-to-one transfer of Ether to an ERC-20 with equivalent value in order to get around the fact that Eth does not comply to the ERC-20 standard
* Since the Write feature was the last feature I worked on, it is not yet been implemented for every write function of the wEth contract and I can only confirm that the deposit function is working

##### Challenges

The primary challenges for this feature were 1) simply learning solidity well enough to thoroughly understand the contract, 2) facilating MetaMask integration with a UX that closely mimiced Etherscan, and 3) having user input _consistently_ propagate correctly to the solidity method call for write methods. For the former I spent about a day going through the solidity docs to get a deeper understanding of the language and code execution in the EVM. The latter two challenges are still a work in progress and due to time scale I have only spent minimal time on addressing them.

##### Code highlights for calling the deposit function on the wEth contract

```javascript
// meta_mask_util.js

export function isConnected() {

  // This line returns a bool indicating wether MetaMask has injected intself
  // into the window
  return (typeof window.ethereum !== 'undefined');
};

export function runContractWrite(methodCB, otherOptions) {

  // Prompt user sign in with MetaMask and retrieve their account number
  window.ethereum.enable().then((accounts) => {

    // Create instance of web3 with user's MetaMask provided connection
    const cWeb3 = new Web3(Web3.givenProvider);

    // Set default options for sending method call, including the account
    // number retrieved
    const options = { from: accounts[0], gas: 10 * 21000 };

    // Combine default options with method specific options fed in by calling 
    // functions
    const combinedOptions = { ...options, ...otherOptions };

    // Create instance of contract from the the contract's ABI 
    // (compiled earlier and imported into this file)
    const contract = new cWeb3.eth.Contract(ABIOBJ, etherWrapAddress);

    // Call the function passed in that deals with sending specific contract 
    // methods
    methodCB(combinedOptions, contract);
  }).catch((err) => {
    console.log('enable err: ', err);
  });
}

// Curried method for calling deposit function of wEth smart contract
// First takes in a success callback from the React component and then later
// takes in options and contract instance passed when runContractWrite() calls it
export const deposit = (success) => (options, contract) => {

  // Calls the deposit method of the contract and sends with options object and
  // callback function for handling errors and result
  contract.methods.deposit()
    .send(options, (err, res) => {
      if (!err) {

        // call passed in react success function with the result
        success(res);
        return res;
      }
      console.log('execution err: ', err);
      return err;
    })
    .catch((err) => console.log('caught err: ', err));
};
```

```javascript
// write_deposit.jsx (react component for the deposit method interface)

  reqDeposit(e) {
    
    // Prevent default button behaviour
    e.preventDefault();

    // Define callback that sets the state variable to the return value of the 
    // deposit method call, which is the address of the transaction
    const succes = (res) => {
      this.setState({ depositResult: res })
    }

    // Bind context of this react component
    let s = succes.bind(this)

    //Grab the user input from state
    const { depositValue } = this.state;

    // Check connection, and if they are connected pass the curried deposit()
    // function with the amount entered by the user (depositValue) to
    // runContractWrite() *note both aformentioned are in the above code snippet
    if (isConnected()) {
      runContractWrite(deposit(s), { value: depositValue.toString() })
    } else {
      alert("You need to connect to Meta Mask")
    }

  }
```