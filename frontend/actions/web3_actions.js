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

// export const receiveBlock = (blk, fetchTxReciepts) => {
export const receiveBlock = (blk, fetchTxRecieptDispatch) => {
// export const receiveBlock = (fetchTxRecieptDispatch) => (blk) => {
  const {
    txnsObject,
    txnsHashArray,
    block,
  } = Web3Util.extractTxnObjectsFromBlock(blk);

  // for every transaction in block now go fetch its reciepts
  // batch request
  // COMMENT IN for batched requests
  // if (txnsHashArray) {
  //   fetchTxReciepts(txnsHashArray);
  // }

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

// callback for batched txReciept requests
const processTxReciept = (dispatch) => (err, txReceipt) => {
  if (!err) {
    dispatch(receiveTransactionReciept(txReceipt));
  } else {
    console.error('Custom ERROR: TxReceipt reciept ERROR: ', err);
  }
};

export const fetchTxReciepts = (dispatch) => (txHashes) => {
  const reqCB = processTxReciept(dispatch);
  const batch = new Web3Util.web3.BatchRequest();
  txHashes.forEach((txHash) => {
    batch.add(Web3Util.web3.eth.getTransactionReceipt.request(txHash, reqCB));
  });
  batch.execute();
};

// batch.execute for request return err and block
// callback for batched block requests
const processBlock = (dispatch) => (err, block) => {
  const fetchTxRecieptDispatch = fetchTransactionReciept(dispatch);
  // const fetchTxRecieptsDispatch = fetchTxReciepts(dispatch);
  if (!err) {
    dispatch(receiveBlock(block, fetchTxRecieptDispatch));
    // dispatch(receiveBlock(block, fetchTxRecieptsDispatch));
  } else {
    console.error('Custom ERROR: Block reciept ERROR: ', err);
  }
};

// Takes in the quantity of blocks to fetch
export const fetchBlocks = (quantity) => (dispatch) => {
  // COMMENT IN for batched block reception
  const processBlockDispatch = processBlock(dispatch);
  Web3Util.getNLatestBlocks(quantity, processBlockDispatch);

  // // settup block processing with neccesary function ready for dispatch
  // const fetchTxRecieptDispatch = fetchTransactionReciept(dispatch);
  // const recieveBlockAndFetchTx = receiveBlock(fetchTxRecieptDispatch);
  // const recieveAndProcessBlk = (blk) => dispatch(recieveBlockAndFetchTx(blk));
  // Web3Util.getNLatestBlocks(quantity, recieveAndProcessBlk);
};
