import { connect } from 'react-redux';

import HomeFeedCard from './home_feed_card';


// move to selects file 
const nMostRecentBlocksArray = ({blocks, blockHashes}, n) => {
  const sliceStart = blockHashes.length - n;
  const recentBlockhHashes = blockHashes.slice(sliceStart);
  // reverse so most recent are at beggining
  return recentBlockhHashes.map((hash) => blocks[hash]).reverse();
};

const mapStateToProps = (state) => {
  return {
    items: nMostRecentBlocksArray(state.entities, 10),
    feedType: 'Blocks',
  };
};

export default connect(mapStateToProps, null)(HomeFeedCard);