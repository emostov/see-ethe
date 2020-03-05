import { RECEIVE_BLOCK } from '../actions/web3_actions';
const blocksReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_BLOCK:
      return { ...state, [action.block.hash]: action.block };
    default:
      return state;

  }
}

export default blocksReducer;