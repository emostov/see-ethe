import React, { useState } from 'react';
import { Container, Row, Col, } from 'reactstrap';

import BlocksFeedContainer from './blocks_feed_container'
// import TransactionsFeedContainer from './transactions_feed_container'

const HomeFeeds = () => {

  return (
    <Container fluid="lg" className='md-4'>
      <Row>
        <Col lg='6' className='feed'>
          <BlocksFeedContainer />
        </Col>

        <Col lg='6' className='feed'>
          {/* <TransactionsFeedContainer /> */}
        </Col>
      </Row>
    </Container>
  )
}

export default HomeFeeds