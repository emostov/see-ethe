import { connect } from 'react-redux';

import { receiveBlockReward } from '../../actions/web3_actions';
import HomeFeedCard from './home_feed_card';

import { selectNMostRecentBlocksArray } from '../../reducers/selectors';


const mapStateToProps = (state) => {

  return {
    items: selectNMostRecentBlocksArray(state.entities, 10),
    feedType: 'Blocks',
    transactions: state.entities.transactions,
  };
};

const mapDispatchToProps = (dispatch) => ({
  receiveBlockReward: (blockWithReward) => dispatch(
    receiveBlockReward(blockWithReward),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeFeedCard);