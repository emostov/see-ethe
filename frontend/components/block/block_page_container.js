import { connect } from 'react-redux';

import BlockPage from './block_page'
import { selectNMostRecentBlocksArray } from '../../reducers/selectors';

const mapStateToProps = (state) => ({
  block: selectNMostRecentBlocksArray(state.entities, 1)[0],
  transactions: state.entities.transactions,
});

export default connect(mapStateToProps, null)(BlockPage)