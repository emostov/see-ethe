import { RECEIVE_TOTAL_SUPPLY } from '../actions/stats_actions';

const totalSupplyReducer = (state = '', action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TOTAL_SUPPLY:
      return action.supply;
    default:
      return state;
  }
};

export default totalSupplyReducer;
