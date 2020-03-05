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


const HomeFeedCard = () => {
  return (
    <Card className='h-100'>
      <CardHeader tag="h3" className='card-header-title'>
        Latest ...
      </CardHeader>
      <CardBody className='card-scroll-holder'>

        <div className='scroll-container'>
          <div className='scroll-items-container'>

          </div>
        </div>

      </CardBody>
      <CardFooter className="">
        <Button tag='a' className='feed-footer-btn w-100'>
          View all ...
        </Button>
      </CardFooter>
    </Card>
  )
}

export default HomeFeedCard;