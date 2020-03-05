import React, { useState } from 'react';
import {
  Container, Form, FormGroup, Card, Label, Input, Button, Row, Col,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Media,
  CardHeader,
  CardBody,
  CardFooter,
} from 'reactstrap';

import HomeFeedCard from './home_feed_card'




const HomeFeeds = () => {

  return (
    <Container fluid="lg" className='md-4'>
      <Row>
        <Col lg='6'>
          <HomeFeedCard />
        </Col>

        <Col lg='6'>
          <HomeFeedCard />
        </Col>
      </Row>
    </Container>
  )
}

export default HomeFeeds