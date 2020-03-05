import * as Web3Util from '../util/web3_util';

export const RECEIVE_BLOCK = 'RECEIVE_BLOCK';

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
    // console.log('processBlock got the following ERROR: ', err);
  }
};

// Takes in the quantity of blocks to fetch
export const fetchBlocks = (quantity) => (dispatch) => {
  const processBlockDispatch = processBlock(dispatch);
  Web3Util.getNLatestBlocks(quantity, processBlockDispatch);
};
