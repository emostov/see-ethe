
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

const Home = () => {


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
                <DropdownToggle split className='white-btn f-13' >All Filters  </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem className='nf' disabled>Action</DropdownItem>
                  <DropdownItem className='nf' disabled>Action</DropdownItem>
                  <DropdownItem className='nf' disabled>Action</DropdownItem>
                  <DropdownItem className='nf' disabled>Action</DropdownItem>
                  <DropdownItem className='nf' disabled>Action</DropdownItem>

                </DropdownMenu>
              </InputGroupButtonDropdown >
              <Input className='f-13' placeholder="Search by Address / Txn Hash / Block / Token / Ethe" />
              <InputGroupAddon addonType="append">
                <Button className='search-btn' color="secondary">Search</Button>
              </InputGroupAddon>
            </InputGroup>
          </Card>
        </div>
      </Container>
    )
  }

  const NetworkOverview = () => {
    return (
      <Container fluid='lg'>
        <Card className='md-4'>
          <Row className='mx-gutters-md-1'>

            <Col lg='4'>
              <div className='media align-items-center'>

                <Media>
                  <Media left href="#">
                    <figure className='u-sm-avatar mr-2'>
                      <img className='price-av' src="assets/ethe-price.png" />
                    </figure>

                    {/* <Media object data-src="assets/ethe-price.svg"  /> */}
                  </Media>
                  <Media body>
                    <Media heading className='net-overview-secondary-txt'>
                      ETHER Price
                    </Media>
                    $227.43 @ 0.02549 BTC 
                  </Media>
                </Media>

                <div></div>
              </div>
              <hr className='hr-space-lg'></hr>

              <div className='media align-items-center'>
                <Media>
                  <Media left href="#">
                    <figure className='u-sm-avatar mr-2'>
                      <img className='' src="assets/world-marked.png" />
                    </figure>
                  </Media>
                  <Media body>
                    <Media heading className='net-overview-secondary-txt'>
                      Market Cap
                    </Media>
                    $25,009,241,081.699
                  </Media>
                </Media>

              </div>
              <hr class='d-none d-md-none hr-space-lg' />
              {/* ::after */}
            </Col>

            <Col lg='4'>
              <div className='media align-items-center'>
                <Media>
                  <Media left href="#">
                    <figure className='u-sm-avatar mr-2'>
                      <img className='' src="assets/latest-block.png" />
                    </figure>
                  </Media>
                  <Media body>
                    <Media heading className='net-overview-secondary-txt'>
                      Latest Block
                    </Media>
                    9609400 (13.0s)
                  </Media>
                </Media>


              </div>
              <hr className='hr-space-lg'></hr>
              <div className='media align-items-center'>
                <Media>
                  <Media left href="#">
                    <figure className='u-sm-avatar mr-2'>
                      <img className='' src="assets/mine-icon.png" />
                    </figure>
                  </Media>
                  <Media body>
                    <Media heading className='net-overview-secondary-txt'>
                      Difficulty
                    </Media>
                    2,295
                  </Media>
                </Media>

              </div>

            </Col >
            <Col lg='4'>
              Graph
            </Col>
          </Row>
        </Card>
      </Container>
    )
  }

  return (
    // <Container className='container'>
    <div>
      {HomeSearchBar()}

      {NetworkOverview()}
      {/* Network Overview */}
      {/* BlockAndTransactionFeeds */}
    </div>
    // </Container>
  )
}

export default Home;