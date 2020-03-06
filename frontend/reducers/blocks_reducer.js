import { RECEIVE_BLOCK, RECEIVE_BLOCK_REWARD } from '../actions/web3_actions';

const blocksReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_BLOCK:
      // check if block already exists
      if (state[action.block.hash] !== undefined) return state;
      return { ...state, [action.block.hash]: action.block };
    case RECEIVE_BLOCK_REWARD:
      if (state[action.blockWithReward.hash] === undefined) return state;
      return {
        ...state,
        [action.blockWithReward.hash]: action.blockWithReward,
      };
    default:
      return state;
  }
};

export default blocksReducer;