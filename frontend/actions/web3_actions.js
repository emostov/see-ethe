import * as Web3Util from '../util/web3_util';
import { calculateUpdatedRewad } from '../util/general_util';

export const RECEIVE_BLOCK = 'RECEIVE_BLOCK';
export const RECEIVE_TRANSACTION_RECEIPT = 'RECEIVE_TRANSACTION_RECEIPT';
export const UPDATE_BLOCK_REWARD = 'UPDATE_BLOCK_REWARD';

const receiveTransactionReciept = (txReceipt) => ({
  type: RECEIVE_TRANSACTION_RECEIPT,
  txReceipt,
});

export const updateBlockReward = (blockHash, reward) => ({
  type: UPDATE_BLOCK_REWARD,
  blockHash,
  reward,
});


export const receiveBlock = (blk, fetchTxRecieptDispatch) => {
  const {
    txnsObject,
    txnsHashArray,
    block,
  } = Web3Util.extractTxnObjectsFromBlock(blk);


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


export const fetchTransactionReciept = (dispatch, getState) => (txHash) => (
  Web3Util.getTransactionReciept(txHash)
    .then((txReceipt) => {
      if (!txReceipt) {
        console.err('Custom Error: TxReciept Error: recieved null');
      }

      dispatch(receiveTransactionReciept(txReceipt));

      const { blockHash, transactionHash } = txReceipt;
      const { blocks, transactions } = getState().entities;
      const block = blocks[blockHash];
      const transaction = transactions[transactionHash];
      const reward = calculateUpdatedRewad(block, transaction);

      dispatch(updateBlockReward(block.hash, reward));
    })
);

// batch.execute for request return err and block
// callback for batched block requests
const processBlock = (dispatch, getState) => (err, block) => {
  const fetchTxRecieptDispatch = fetchTransactionReciept(dispatch, getState);

  if (!err) {
    // make sure we don't already have block to prevent redudant down stream
    // actions
    const { blocks } = getState().entities;
    if (blocks[block.hash] !== undefined) return;
    dispatch(receiveBlock(block, fetchTxRecieptDispatch));
  } else {
    console.error('Custom ERROR: Block reciept ERROR: ', err);
  }
};

// Takes in the quantity of blocks to fetch
export const fetchBlocks = (quantity) => (dispatch, getStore) => {
  const processBlockDispatch = processBlock(dispatch, getStore);
  Web3Util.getNLatestBlocks(quantity, processBlockDispatch);
};
