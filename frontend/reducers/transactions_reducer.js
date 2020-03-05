import { RECEIVE_BLOCK } from '../actions/web3_actions';

const transactionsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_BLOCK:
      // check if the first transaction from block already exist
      if (state[Object.keys(action.txnsObject)[0]] !== undefined) return state;
      return { ...state, ...action.txnsObject };
    default:
      return state;

  };
};

export default transactionsReducer;

