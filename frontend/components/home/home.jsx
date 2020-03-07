import React, { useState } from 'react';
import {
  Container, Form, FormGroup, Card, Label, Input, Button, Row, Col,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Media
} from 'reactstrap';

import HomeSearchBar from './home_search_bar';
import NetworkOverview from './network_overview';
import HomeFeeds from './home_feeds';

const Home = () => {


  return (
    <div>
      <HomeSearchBar />
      {/* toggle component */}
      <NetworkOverview />
      <HomeFeeds />
    </div>
  )
}

export default Home;