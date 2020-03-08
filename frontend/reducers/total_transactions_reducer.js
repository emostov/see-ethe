import { RECEIVE_BLOCK_CHAIR_STATS } from '../actions/stats_actions';

const totalTransactionsReducer = (state = '', action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_BLOCK_CHAIR_STATS:
      return action.totalTransactions;
    default:
      return state;
  }
};

export default totalTransactionsReducer;
