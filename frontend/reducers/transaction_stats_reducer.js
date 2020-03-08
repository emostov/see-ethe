import { RECEIVE_BLOCK_CHAIR_STATS } from '../actions/stats_actions';

const transactionsStatsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_BLOCK_CHAIR_STATS:
      return {
        transactions24H: action.transactions24H,
        mempoolTPS: action.mempoolTPS,
        totalTransactions: action.totalTransactions,
      };
    default:
      return state;
  }
};

export default transactionsStatsReducer;
