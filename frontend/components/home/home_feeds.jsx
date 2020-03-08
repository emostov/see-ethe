import React, { useState } from 'react';
import { Container, Row, Col, } from 'reactstrap';

import BlocksFeedContainer from './blocks_feed_container'
import TransactionsFeedContainer from './transactions_feed_container'

const HomeFeeds = () => {

  return (
    <Container fluid="lg" className='md-4'>
      <Row className='home '>
        <Col lg='6' className='feed md-1'>
          <BlocksFeedContainer />
        </Col>

        <Col lg='6' className='feed md-1'>
          <TransactionsFeedContainer />
        </Col>
      </Row>
    </Container>
  )
}

export default HomeFeeds