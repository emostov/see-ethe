import { connect } from 'react-redux';

import HomeFeedCard from './home_feed_card';
import { selectNMostRecentBlocksArray } from '../../reducers/selectors';


const mapStateToProps = (state) => ({
  blocks: selectNMostRecentBlocksArray(state.entities, 2),
  transactions: state.entities.transactions,

});

export default connect(mapStateToProps, null)(HomeFeedCard)