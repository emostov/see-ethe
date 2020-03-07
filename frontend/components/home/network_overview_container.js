import { connect } from 'react-redux';

import NetworkOverview from './network_overview';
import { selectNMostRecentBlocksArray } from '../../reducers/selectors';
import { fetchPrices } from '../../actions/stats_actions';

const mapStateToProps = (state) => {
  const latestBlocks = selectNMostRecentBlocksArray(state.entities, 10);
  return {
    latestBlock: latestBlocks[0],
    nextLatestBlock: latestBlocks[1],
    latestBlocks,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchPrices: () => dispatch(fetchPrices()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NetworkOverview);
