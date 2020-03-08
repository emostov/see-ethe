import { connect } from 'react-redux';

import NetworkOverview from './network_overview';
import { selectNMostRecentBlocksArray } from '../../reducers/selectors';
import { fetchPrices, fetchTotalSupply } from '../../actions/stats_actions';

const mapStateToProps = (state) => {
  const latestBlocks = selectNMostRecentBlocksArray(state.entities, 10);
  const { ethbtc, ethusd } = state.entities.prices;
  const { totalSupply } = state.entities;

  return {
    latestBlock: latestBlocks[0],
    nextLatestBlock: latestBlocks[1],
    latestBlocks,
    ethbtc,
    ethusd,
    totalSupply,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchPrices: () => dispatch(fetchPrices()),
  fetchTotalSupply: () => dispatch(fetchTotalSupply()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NetworkOverview);
