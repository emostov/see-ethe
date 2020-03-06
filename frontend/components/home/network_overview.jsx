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

const NetworkOverview = () => {
  return (
    <Container fluid='lg' className='md-4'>
      <Card className='md-4'>
        <Row className='mx-gutters-md-1'>

          <Col lg='4' md='6'>
            <div className='media align-items-center'>

              <Media>
                <Media left href="#">
                  <figure className='u-sm-avatar mr-2'>
                    <img className='price-av' src="assets/ethe-price.png" />
                  </figure>

                  {/* <Media object data-src="assets/ethe-price.svg"  /> */}
                </Media>
                <Media body className='width-100pe'>
                  <Media heading className='net-overview-secondary-txt'>
                    ETHER Price
                    </Media>
                  <a className='net-overview-primary-link-txt'>$227.43</a>
                  <span className='secondary-size-1'> @ 0.02549 BTC </span>
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
                <Media body className='width-100pe'>
                  <Media heading className='net-overview-secondary-txt'>
                    Market Cap
                    </Media>
                  <a className='net-overview-primary-link-txt'>$25,009,241,081.699</a>

                </Media>
              </Media>

            </div>
            <hr className='d-none d-md-none hr-space-lg' />
            {/* ::after */}
          </Col>

          <Col lg='4' md='6'>
            <div className='media align-items-center'>
              <Media>
                <Media left href="#">
                  <figure className='u-sm-avatar mr-2'>
                    <img className='' src="assets/latest-block.png" />
                  </figure>
                </Media>

                <Media body className='width-latest-block '>
                  <Media heading className='net-overview-secondary-txt'>
                    Latest Block
                    </Media>
                  <a className='net-overview-primary-link-txt'>9609400</a>
                  <span className='secondary-small'> (13.0s)</span>
                </Media>

                <div className='text-right'>
                  <Media heading className='net-overview-secondary-txt'>
                    Transaction
                    </Media>
                  <a className='net-overview-primary-link-txt'>651.178</a>
                  <span className='secondary-small'> (8.8 TPS)</span>
                </div>

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

                <Media body className='width-difficulty'>
                  <Media heading className='net-overview-secondary-txt'>
                    Difficulty
                    </Media>
                  <a className='net-overview-primary-link-txt'>2,295</a>
                </Media>

                <div className='text-right'>
                  <Media heading className='net-overview-secondary-txt'>
                    Hash Rate
                    </Media>
                  <a className='net-overview-primary-link-txt'>2,295</a>
                </div>


              </Media>
            </div>

          </Col >
          <Col lg='4' md='12'>
            Graph
            </Col>
        </Row>
      </Card>
    </Container>
  )
}

export default NetworkOverview;
