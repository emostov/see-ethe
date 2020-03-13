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
###### [Go to Features](#features)

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

## Features

### Live Block and Transaction Feeds
###### [Next Feature]()

* Block requests use the Web3js batch feature to provide synchronous behaviour in order to avoid sorting on reciept. The batched  request has performance hit for response time, but a batched request is only used once on the initial component mount and all subsequent requests are for single blocks.
* A block reward field is initially set to a baseline of 2 Eth + relevant uncle reward
* Full transaction objects are included in block requests to avoid a N+1 fetch
* After the reciept of a block, a transaction reciept is requested for each transaction in order to obtain the exact amount of gas used in processing the transaction. Upon succesful retrieval the reciept is merged with the transaction object, actual wei payed for gas is calculated
* The block reward is incremented in every time a transaction reciept is recieved
* Clicking on the block number and associated blue links in either of the feeds will take the user to the detailed show page for the respective block


```javascript
// web3_util.js

// general connection setup
export const web3 = new Web3(new Web3.providers.HttpProvider(infuraEndPoint));
export const web3Rinkeby = new Web3(
  new Web3.providers.HttpProvider(rinkebyEndPoint),
);

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
      batch.add(web3.eth.getBlock.request(blockNum,
        returnTransactionObjects,
        processBlockCB));
    });
    batch.execute();
  });
};

// Pull apart transaction objects from blocks and set block reward
// This function is used prior to insertion in state via the receiveBlockAction
export const extractTxnObjectsFromBlock = (block) => {
  const { transactions } = block;
  const newBlock = { ...block };

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
      .add(new Big(2, 10))
      .toString();
    newBlock.reward = baseReward;

    return { txnsObject, txnsHashArray, block: newBlock };
  }
  // Return something to key into to prevent undefined errors later
  return { txnsObject: {}, txnsHashArray: {}, block };
};

// web3_actions.js

```
