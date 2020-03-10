import { connect } from 'react-redux';
import HomeSearchBar from './home_search_bar';

const mapStateToProps = (state) => {
  return {
    blocks: state.entities.blocks,
  };
};

export default connect(mapStateToProps, null)(HomeSearchBar);
