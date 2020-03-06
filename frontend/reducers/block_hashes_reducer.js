
import { RECEIVE_BLOCK } from '../actions/web3_actions';

const blockHashesReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_BLOCK:
      // TODO - come up with more efficient solution
      // check if hash already exists
      if (state.includes(action.block.hash)) return state;
      return [...state, action.block.hash];
    default:
      return state;
  };
};

export default blockHashesReducer;
