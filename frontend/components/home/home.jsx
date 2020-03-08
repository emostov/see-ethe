import React from 'react';

import HomeSearchBar from './home_search_bar';
import NetworkOverviewContainer from './network_overview_container';
import HomeFeeds from './home_feeds';

const Home = () => {
  return (
    <div>
      <HomeSearchBar />

      {/* toggle component */}

      <NetworkOverviewContainer/>
      <HomeFeeds />
    </div>
  )
}

export default Home;