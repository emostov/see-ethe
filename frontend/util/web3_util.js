import Web3 from 'web3';
import Big from 'big.js';
import {
  timeDiff,
} from './general_util';
import infuraEndPoint from './web3_identity';


export const web3 = new Web3(new Web3.providers.HttpProvider(infuraEndPoint));

// utility for creating a number range to loop over
// TODO move to a general utility file
export const range = (start, end) => {
  const result = [];
  for (let i = start; i <= end; i += 1) {
    result.push(i);
  }
  return result;
};

// https://ethereum.stackexchange.com/questions/1587/how-can-i-get-the-data-of-the-latest-10-blocks-via-web3-js
export const getNLatestBlocks = (n, processBlockCB) => {
  web3.eth.getBlockNumber().then((latestBlockNum) => {
    const blockRange = range(latestBlockNum - n, latestBlockNum + 1);

    const batch = new web3.BatchRequest();
    const returnTransactionObjects = true;
    blockRange.forEach((blockNum) => {
      batch.add(web3.eth.getBlock.request(blockNum,
        returnTransactionObjects,
        processBlockCB));
    });
    batch.execute();
  });
};

// AVG difficulty / AVG block time
export const networkHashRate = (latestBlocks) => {
  if (!latestBlocks.length) return '';
  let bigTotalDifficulty = new Big(0, 10);
  let totalBlockTime = 0;
  const total = latestBlocks.length;
  latestBlocks.forEach((block, idx) => {
    const mineTime = idx === total - 1 ? (13)
      : (timeDiff(latestBlocks[idx], latestBlocks[idx + 1]));
    totalBlockTime += mineTime;
    bigTotalDifficulty = bigTotalDifficulty.add(new Big(block.difficulty));
  });

  const avgBlockTime = totalBlockTime / total;
  const bigAvgBlockTime = new Big(avgBlockTime, 0);
  const avgDifficulty = bigTotalDifficulty.div(new Big(total, 0));

  const bigNetworkHR = avgDifficulty.div(bigAvgBlockTime);
  return bigNetworkHR.toString();
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
    // also set reward while we have the block
    const baseReward = new Big(newBlock.uncles.length * (2 / 32), 10)
      .add(new Big(2, 10))
      .toString();
    newBlock.reward = baseReward;

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
  if (tx.hash !== reciept.transactionHash) return tx;
  return calcGasUsed({ ...tx, ...reciept });
};

export const getTransactionReciept = (txHash) => (
  web3.eth.getTransactionReceipt(txHash)
);

export const requestBatcher = (args) => {
  const batch = new web3.BatchRequest();
  args.forEach((req) => batch.add(req));
  return batch.execute();
};




export const calculateUpdatedRewad = (block, transaction) => {
  if (!block) return '2';
  if (block.reward && !transaction) return block.reward;
  const costEthe = web3.utils.fromWei(
    transaction.costOfGasUsed.toString(),
    'ether',
  );
  const bigCost = new Big(costEthe, 10);

  // if for some reason block does not have reward assume its 2
  const blockReward = block.reward ? block.reward : 2;
  const bigReward = new Big(blockReward, 10).toString();

  const newReward = bigCost.add(bigReward);
  return newReward.toString();
}