import { RECEIVE_PRICES } from '../actions/stats_actions';

const pricesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PRICES:
      return action.prices;

    default:
      return state;
  }
};

export default pricesReducer;
