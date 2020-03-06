import * as Web3Util from '../util/web3_util';
import { faWindowMinimize } from '@fortawesome/free-solid-svg-icons';

export const RECEIVE_BLOCK = 'RECEIVE_BLOCK';
export const RECEIVE_TRANSACTION_RECEIPT = 'RECEIVE_TRANSACTION_RECEIPT';

const receiveTransactionReciept = (txReceipt) => ({
  type: RECEIVE_TRANSACTION_RECEIPT,
  txReceipt,
});

export const receiveBlock = (blk) => {
  const {
    txnsObject,
    txnsHashArray,
    block,
  } = Web3Util.extractTxnObjectsFromBlock(blk);

  return {
    type: RECEIVE_BLOCK,
    block,
    txnsObject,
    txnsHashArray,
  };
};

// batch.execute for request return err and block
const processBlock = (dispatch) => (err, block) => {
  if (!err) {
    dispatch(receiveBlock(block));
  } else {
    console.error('Block reciept ERROR: ', err);
  }
};

export const fetchTransactionReciept = (dispatch) => (txHash) => (
  Web3Util.getTransactionReciept(txHash)
    .then((txReceipt) => dispatch(receiveTransactionReciept(txReceipt)))
);

// Takes in the quantity of blocks to fetch
export const fetchBlocks = (quantity) => (dispatch) => {
  const processBlockDispatch = processBlock(dispatch);

  // pass this call back so each tx in block can have its reciept fetched
  const fetchTxRecieptDispatch = fetchTransactionReciept(dispatch);
  Web3Util.getNLatestBlocks(quantity, processBlockDispatch, fetchTxRecieptDispatch);
};

