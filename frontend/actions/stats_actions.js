import * as statAPIUtil from '../util/stats_api_util';

export const RECEIVE_PRICES = 'RECEIVE_PRICES';
export const RECEIVE_TOTAL_SUPPLY = 'RECEIVE_TOTAL_SUPPLY';
export const RECEIVE_BLOCK_CHAIR_STATS = 'RECEIVE_BLOCK_CHAIR_STATS';

export const receievePrice = (replyObj) => ({
  type: RECEIVE_PRICES,
  prices: replyObj.result,
});

export const receiveBlockChairStates = (replyObj) => {
  console.log(replyObj);
  return {
    type: RECEIVE_BLOCK_CHAIR_STATS,
    totalTransactions: replyObj.data.transactions,
    transactions24H: replyObj.data.blocks_24h,
    mempoolTPS: replyObj.data.mempoolTPS
  }
};

export const receieveTotalSupply = (replyObj) => ({
  type: RECEIVE_TOTAL_SUPPLY,
  supply: replyObj.result,
});

export const fetchPrices = () => (dispatch) => statAPIUtil.lastPrices()
  .then((prices) => dispatch(receievePrice(prices)));

export const fetchTotalSupply = () => (dispatch) => statAPIUtil.totalSupply()
  .then((totalSupply) => dispatch(receieveTotalSupply(totalSupply)));

export const fetchBlockChairStats = () => (dispatch) => statAPIUtil.blockChairStats()
  .then((stats) => {
    console.log(stats);
    dispatch(receiveBlockChairStates(stats));
  });

