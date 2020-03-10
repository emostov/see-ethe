import { connect } from 'react-redux';

import BlockPage from './block_page'
import { selectNMostRecentBlocksArray } from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps.match.params.hash);
  // console.log(ownProps.match.hash);
  return {
    block: state.entities.blocks[ownProps.match.params.hash],
    addressTypeTags: state.entities.addressTypeTags,
  };
};


export default connect(mapStateToProps, null)(BlockPage);