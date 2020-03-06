import { connect } from 'react-redux';

import HomeFeedCard from './home_feed_card';
import { selectNMostRecentBlocksArray } from '../../reducers/selectors';


const mapStateToProps = (state) => ({
  blocks: selectNMostRecentBlocksArray(state.entities, 10),
  transactions: state.entities.transactions,
  feedType: 'Transactions',
});

export default connect(mapStateToProps, null)(HomeFeedCard);

