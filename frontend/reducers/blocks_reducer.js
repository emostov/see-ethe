import {
  RECEIVE_BLOCK,
  UPDATE_BLOCK_REWARD,
} from '../actions/web3_actions';

const updateBlockRewardInState = ({ blockHash, reward }, state) => {
  const newState = { ...state };
  newState[blockHash].reward = reward;
  return newState;
};

const blocksReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_BLOCK:
      // check if block already exists
      if (state[action.block.hash] !== undefined) return state;
      return { ...state, [action.block.hash]: action.block };
    case UPDATE_BLOCK_REWARD:
      return updateBlockRewardInState(action, state);
    default:
      return state;
  }
};

export default blocksReducer;
