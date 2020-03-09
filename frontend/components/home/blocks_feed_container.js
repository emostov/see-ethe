import { connect } from 'react-redux';

import HomeFeedCard from './home_feed_card';
import { selectNMostRecentBlocksArray } from '../../reducers/selectors';
import { fetchAddressTypeTags } from '../../actions/address_actions';

const mapStateToProps = (state) => {
  return {
    items: selectNMostRecentBlocksArray(state.entities, 10),
    feedType: 'Blocks',
    transactions: state.entities.transactions,
    addressTypeTags: state.entities.addressTypeTags,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchAddressTypeTags: () => dispatch(fetchAddressTypeTags())
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeFeedCard);
