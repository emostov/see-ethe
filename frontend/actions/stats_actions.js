import * as statAPIUtil from '../util/stats_api_util'
export const RECEIVE_PRICES = 'RECEIVE_PRICES';
export const RECEIVE_TOTAL_SUPPLY = 'RECEIVE_TOTAL_SUPPLY';

export const receievePrice = (replyObj) => ({
  type: RECEIVE_PRICES,
  prices: replyObj.result,
});

export const receieveTotalSupply = (replyObj) => ({
  type: RECEIVE_TOTAL_SUPPLY,
  supply: replyObj.result,
});

export const fetchPrices = () => (dispatch) => statAPIUtil.lastPrices()
  .then((prices) => dispatch(receievePrice(prices)));

export const fetchTotalSupply = () => (dispatch) => statAPIUtil.totalSupply()
  .then((totalSupply) => dispatch(receieveTotalSupply(totalSupply)));


