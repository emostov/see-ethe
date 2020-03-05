
import { RECEIVE_BLOCK } from '../actions/web3_actions';

const blockHashesReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_BLOCK:
      return [...state, action.block.hash];
    default:
      return state;
  };
};

export default blockHashesReducer;
