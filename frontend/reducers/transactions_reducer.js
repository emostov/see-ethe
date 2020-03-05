import { RECEIVE_BLOCK } from '../actions/web3_actions';

const transactionsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_BLOCK:
      return { ...state, ...action.txnsObject };
    default:
      return state;

  };
};

export default transactionsReducer;

