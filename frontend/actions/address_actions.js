import * as AddressAPIUtil from '../util/address_api_util';

export const RECEIVE_ADDRESS_TYPE_TAGS = 'RECEIVE_ADDRESS_TYPE_TAGS';
export const RECEIVE_ADDRESS_TYPE_TAG = 'RECEIVE_ADDRESS_TYPE_TAG';

export const receievAddressTypeTags = (addressTypeTags) => ({
  type: RECEIVE_ADDRESS_TYPE_TAGS,
  addressTypeTags,
});

export const receievAddressTypeTag = (addressTypeTag) => ({
  type: RECEIVE_ADDRESS_TYPE_TAG,
  addressTypeTag,
});

export const fetchAddressTypeTags = () => (dispatch) => AddressAPIUtil
  .addressTypeTags()
  .then((tags) => dispatch(receievAddressTypeTags(tags)));

export const fetchAddressTypeTag = (address) => (dispatch) => AddressAPIUtil
  .addressTypeTag(address)
  .then((tag) => dispatch(receievAddressTypeTag(tag)));

  