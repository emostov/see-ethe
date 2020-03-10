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

import React, { useState } from 'react';

const HomeSearchBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [splitButtonOpen, setSplitButtonOpen] = useState(false);

  const toggleDropDown = () => setDropdownOpen(!dropdownOpen);

  const toggleSplit = () => setSplitButtonOpen(!splitButtonOpen);
  return (
    <Container fluid="lg" className='md-4'>
      <div className='main-contents'>
        <Card body className='gradient-half-primary-body' >
          <div className='search-header'>
            <h5 className='white-text'>
              Ethereum Block Chain Explorer
              </h5>
            <div className='quick-links white-text'>
              <ul className='small-text'>
                <li className='small-text'>Quick links: </li>
                <li className='small-text dt'>ERC-20 Quick Links</li>
                <li className='small-text dt'>ERC-721 Quick Links</li>
              </ul>
            </div>
          </div>
          <InputGroup>
            <InputGroupButtonDropdown addonType="prepend"
              isOpen={splitButtonOpen} toggle={toggleSplit}>
              <DropdownToggle split className='white-btn mid-search-txt' >All Filters  </DropdownToggle>
              <DropdownMenu>
                <DropdownItem className='nf' disabled>...</DropdownItem>
                <DropdownItem className='nf' disabled>...</DropdownItem>
                <DropdownItem className='nf' disabled>...</DropdownItem>
                <DropdownItem className='nf' disabled>...</DropdownItem>
                <DropdownItem className='nf' disabled>...</DropdownItem>

              </DropdownMenu>
            </InputGroupButtonDropdown >
            <Input className='mid-search-txt' placeholder="Search by block height or hash (use the feed for block info)" />
            <InputGroupAddon addonType="append">
              <Button className='search-btn' color="secondary">Search</Button>
            </InputGroupAddon>
          </InputGroup>
        </Card>
      </div>
    </Container>
  )
}

export default HomeSearchBar;

