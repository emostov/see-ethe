import Web3 from 'web3';

import infuraEndPoint from './web3_identity';

const web3 = new Web3(new Web3.providers.HttpProvider(infuraEndPoint));

// utility for creating a number range to loop over
// TODO move to a general utility file
const range = (start, end) => {
  const result = [];
  for (let i = start; i <= end; i += 1) {
    result.push(i);
  }
  return result;
};

// https://ethereum.stackexchange.com/questions/1587/how-can-i-get-the-data-of-the-latest-10-blocks-via-web3-js
export const getNLatestBlocks = (n, processBlockCB) => {
  const batch = new web3.BatchRequest();

  web3.eth.getBlockNumber().then((latestBlockNum) => {
    const blockRange = range(latestBlockNum - n, latestBlockNum + 1);
    const returnTransactionObjects = true;
    blockRange.forEach((blockNum) => {
      batch.add(web3.eth.getBlock.request(blockNum,
        returnTransactionObjects,
        processBlockCB));
    });
    batch.execute();
  });
};

// extracts txn objects from an incoming block
// returns an object of txns with hash as keys, a
// modified blocks with just txn hashes, and an array of txn hashes
// @return { txnsObject, txnsHashArray, block}
export const extractTxnObjectsFromBlock = (block) => {
  const { transactions } = block;
  const newBlock = { ...block };

  if ((typeof transactions[0] === 'object' && transactions[0] !== null)) {
    const txnsObject = {};
    const txnsHashArray = [];
    transactions.forEach((txn) => {
      // txReciept = await web3.eth.getTransactionReceipt(txn)
      txnsHashArray.push(txn.hash);
      txnsObject[txn.hash] = txn;
    });

    newBlock.transactions = [...txnsHashArray];
    return { txnsObject, txnsHashArray, block: newBlock };
  }
  // return something to key into to prevent undefined errors later
  return { txnsObject: {}, txnsHashArray: {}, block };
};

const calcGasUsed = (txObj) => {
  const { gasUsed, gasPrice } = txObj;
  const intGasUsed = parseInt(gasUsed, 10);
  const intGasPrice = parseInt(gasPrice, 10);
  const newTxObj = { ...txObj };
  newTxObj.costOfGasUsed = intGasPrice * intGasUsed;

  return newTxObj;
};

export const mergeTxAndReciept = (tx, reciept) => {
  if (tx.hash !== reciept.hash) return tx;
  return calcGasUsed({ ...tx, ...reciept });
};

export const getTransactionReciept = (txHash) => (
  web3.eth.getTransactionReceipt(txHash)
);



export const requestBatcher = (...args) => {
  const batch = new web3.BatchRequest();
  args.forEach((req) => batch.add(req));
  return batch;
};

