# See the Ethe

###### [Live Site](https://see-ethe.herokuapp.com/#/home)


## Table of Contents

* [Background](#background)
* [Technologies](#technologies)
* [Features](#features)

---

## Background

###### [Jump to Technologies](#technologies)

See-The-Ethe, an Etherscan clone, is a blockchain explorer that provides rich
data feeds on blocks and transactions, a network health overview, and smart
contract Read and Write interaction. A user can sign up, login, or use a demo
login. However, following the ethos of privacy the App does not require login to
use any of the key features.

This site uses Ruby On Rails and PostgreSQL for the backend to store user and
session info, photos, and account tags. React + Redux was utilized to create a performant user interface implemented with future scalability in mind. The App fetches directly from an Infura node using Web3js as a convenience library to provide real time updates on blocks, transactions, and the wEth smart contract. To facilitate transaction signatures for smart contract Write operations the App integrates with the chrome MetaMask extension.

## Technologies
###### [Jump to Features](#features)

* Ethereum main-net and Rinkeby test-net
* Web3js
* Infura
* MetaMask
* React.js
* Redux.js
* Node.js
* Ruby on Rails
* PostgreSQL
* Webpack

---

## Features

### Live Block and Transaction Feeds
###### [Next Feature]()

##### Overview

* Block requests use the Web3js batch feature to provide synchronous behaviour in order to avoid sorting on reciept. The batched  request has performance hit for response time, but a batched request is only used once on the initial component mount and all subsequent requests are for single blocks.
* A block reward field is initially set to a baseline of 2 Eth + relevant uncle reward
* Full transaction objects are included in block requests to avoid a N+1 fetch
* After the reciept of a block, a transaction reciept is requested for each transaction in order to obtain the exact amount of gas used in processing the transaction. Upon succesful retrieval the reciept is merged with the transaction object, actual wei payed for gas is calculated
* The block reward is incremented in every time a transaction reciept is recieved
* Clicking on the block number and associated blue links in either of the feeds will take the user to the detailed show page for the respective block

##### Challenges

The two major challenges were 1) dealing with the slow response time of the Infura node and 2) fetching transaction reciepts/calculating block reward in a performant manner that would no diminish user exprience. Below I elaborate on the issues of my initial and naive implementation of the latter followed by key sections of code from the current strategy

The initial implementation of the redux cycle and associated calculations suffered from major performance issues that would delay user interaction. The initial flow was something like:

* Fetch blocks with associated transactions
* Fetch associated transaction reciept for each transaction
* Combine reciept and transaction object
* On re-render, while mapping over blocks, calculate each block reward so it updates with with each transaction reciept
* Once a block hits an arbirtrary age (i.e 30 seconds), save the reward as a block attribute, dispatch to state, and skip future reward calculations

Bottlenecks:

* Big number calculations on every render block the stack and hinder realtime page interaction
* Redundant calculations are made since they are done based on renders and not when the relevent information is recieved
* Picking an arbitrary age to stop updates can result in incomplete results
* Dispatching an action from the render cycle does not follow React philosophy

Solution: Decouple reward updates from the render cycle.
In order to do this I created additional callbacks for dispatching updated transaction gas costs and updated block rewards. These are then threaded down starting with the initial fetch of the block. This process elimated redundant Big.js calculations and instead saves them to state so they can be asynchronously built upon.

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
      // state insertion, transactionReciept fetching, and calculations to update
      // block reward and cost of actual gas used per transaction
      batch.add(web3.eth.getBlock.request(blockNum,
        returnTransactionObjects,
        processBlockCB));
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

    // Create Object of all transactions with correct redux state shape
    transactions.forEach((txn) => {
      txnsHashArray.push(txn.hash);
      txnsObject[txn.hash] = txn;
    });

    // Assign new block an array of transactions hashes to keep state flat
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

    // Make sure we don't already have block to prevent redudant down stream
    // actions
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
// the given transactionHash. 
// This function passed as callback to receive block
export const fetchTransactionReciept = (dispatch, getState) => (txHash) => (
  Web3Util.getTransactionReciept(txHash)
    .then((txReceipt) => {

      // If the return object is not null do not continue
      if (!txReceipt) {
        return;
      }

      // Dispatch reciept so it can be merged with relevant transaction and 
      // inserted into state. This will add the total cost of the gas use
      // to the transaction so it can be refferenced later when calculating 
      // block reward
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
// and attribute of the transaction object so it can be saved in state
const calcGasUsed = (txObj) => {
  const { gasUsed, gasPrice } = txObj;
  const newTxObj = { ...txObj };
  newTxObj.costOfGasUsed = parseInt(gasPrice, 10) * parseInt(gasUsed, 10);
  return newTxObj;
};

// This function calculates the updated reward for the block once the transaction
// receipt for a particular transaction has been merged into the transaction.
// It is important for performance to minimize the amount of times Big.js 
// arithmetic is completed so this function is only called once per transaction
// and is decoupled from the rendering process
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
