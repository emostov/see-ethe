import { connect } from 'react-redux';

import BlockPage from './block_page'

const mapStateToProps = (state, ownProps) => {
  return {
    block: state.entities.blocks[ownProps.match.params.hash],
    addressTypeTags: state.entities.addressTypeTags,
  };
};


export default connect(mapStateToProps, null)(BlockPage);
