import { connect } from 'react-redux';

import NetworkOverview from './network_overview';
import { selectNMostRecentBlocksArray } from '../../reducers/selectors';

const mapStateToProps = (state) => {
  const latestBlocks = selectNMostRecentBlocksArray(state.entities, 10);
  return {
    latestBlock: latestBlocks[0],
    nextLatestBlock: latestBlocks[1],
    latestBlocks,
  };
};

export default connect(mapStateToProps, null)(NetworkOverview);
