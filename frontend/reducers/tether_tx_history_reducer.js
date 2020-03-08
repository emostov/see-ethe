import { RECEIVE_TETHER_TX_HISTORY } from '../actions/stats_actions';

const tetherTXHistoryReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TETHER_TX_HISTORY:
      return action.countTxs;
    default:
      return state;
  }
};

export default tetherTXHistoryReducer;
