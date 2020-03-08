import { connect } from 'react-redux';

import HomeFeedCard from './home_feed_card';
import { selectNMostRecentBlocksArray } from '../../reducers/selectors';


const mapStateToProps = (state) => {

  return {
    items: selectNMostRecentBlocksArray(state.entities, 10),
    feedType: 'Blocks',
    transactions: state.entities.transactions,
  };
};

export default connect(mapStateToProps, null)(HomeFeedCard);
