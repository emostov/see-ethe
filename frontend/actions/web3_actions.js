import * as Web3Util from '../util/web3_util';

export const RECEIVE_BLOCK = 'RECEIVE_BLOCK';
export const RECEIVE_TRANSACTION_RECEIPT = 'RECEIVE_TRANSACTION_RECEIPT';
export const RECEIVE_BLOCK_REWARD = 'RECEIVE_BLOCK_REWARD';

const receiveTransactionReciept = (txReceipt) => ({
  type: RECEIVE_TRANSACTION_RECEIPT,
  txReceipt,
});

export const receiveBlockReward = (blockWithReward) => ({
  type: RECEIVE_BLOCK_REWARD,
  blockWithReward,
});

export const receiveBlock = (blk, fetchTxRecieptDispatch) => {
  const {
    txnsObject,
    txnsHashArray,
    block,
  } = Web3Util.extractTxnObjectsFromBlock(blk);

  // for every transaction in block now go fetch its reciepts
  if (txnsHashArray) {
    txnsHashArray.forEach((txHash) => {
      fetchTxRecieptDispatch(txHash);
    });
  }

  return {
    type: RECEIVE_BLOCK,
    block,
    txnsObject,
    txnsHashArray,
  };
};

export const fetchTransactionReciept = (dispatch) => (txHash) => (
  Web3Util.getTransactionReciept(txHash)
    .then((txReceipt) => dispatch(receiveTransactionReciept(txReceipt)))
);

// batch.execute for request return err and block
const processBlock = (dispatch) => (err, block) => {
  const fetchTxRecieptDispatch = fetchTransactionReciept(dispatch);

  if (!err) {
    dispatch(receiveBlock(block, fetchTxRecieptDispatch));
  } else {
    console.error('Block reciept ERROR: ', err);
  }
};


// Takes in the quantity of blocks to fetch
export const fetchBlocks = (quantity) => (dispatch) => {
  const processBlockDispatch = processBlock(dispatch);
  Web3Util.getNLatestBlocks(quantity, processBlockDispatch);
};
