import {
  RECEIVE_ADDRESS_TYPE_TAGS,
  RECEIVE_ADDRESS_TYPE_TAG,
} from '../actions/address_actions';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ADDRESS_TYPE_TAGS:
      return { ...state, ...action.addressTypeTags };
    case RECEIVE_ADDRESS_TYPE_TAG:
      return { ...state, [action.addressTypeTag.address]: action.addressTypeTag };
    default:
      return state;
  }
};

export default usersReducer;

