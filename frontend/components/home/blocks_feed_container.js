import { connect } from 'react-redux';

import HomeFeedCard from './home_feed_card';


// move to selects file 
const nMostRecentBlocksArray = ({ blocks, blockHashes }, n) => {
  const sliceStart = n <= blockHashes.length ? blockHashes.length - n : 0;
  const recentBlockhHashes = blockHashes.slice(sliceStart);
  // reverse so most recent are at beginning
  return recentBlockhHashes.map((hash) => blocks[hash]).reverse();
};

const mapStateToProps = (state) => {
  return {
    items: nMostRecentBlocksArray(state.entities, 10),
    feedType: 'Blocks',
  };
};

export default connect(mapStateToProps, null)(HomeFeedCard);