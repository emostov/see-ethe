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

import BlockItem from './block_item'



const minutesAndSeconds = (nSeconds) => {
  const minutes = Math.floor(nSeconds / 60);
  const seconds = nSeconds - (minutes * 60);
  const minuteStr = minutes === 0 ? '' : `${minutes} min`
  const secondStr = `${seconds} seconds ago`
  return `${minuteStr} ${secondStr}`
}

const calculateTimeDiff = (item) => {
  // both curr and timestamp are unix time in seconds
  const { timestamp } = item;
  const curr = Math.round((new Date()).getTime() / 1000);
  const delta = curr - timestamp
  return delta
}

const itemAgeToString = (item) => {
  const diff = calculateTimeDiff(item);
  return minutesAndSeconds(diff)
}

const HomeFeedCard = (props) => {

  const mapItems = () => {
    return props.items.map((item) => {

      // const diff = calculateTimeDiff(b);

      const age = itemAgeToString(item)
      console.log(age)
      // ternary goes here for block / txn items
      return <BlockItem block={item} key={item.hash} age={age} />

    });

  }
  const itemsComponents = () => {
    if (props.items === null) { return '' }
    return props.feedType === 'Blocks' ? (
      mapItems()

    ) : (
        ""
      )
  }

  // console.log('time diff', calculateTimeDiff())


  return (
    <Card className='h-100'>
      <CardHeader tag="h3" className='card-header-title'>
        Latest {props.feedType}
      </CardHeader>
      <CardBody className='card-scroll-holder'>

        <div className='scroll-container'>
          <div className='scroll-items-container'>
            {itemsComponents()}

          </div>
        </div>

      </CardBody>
      <CardFooter className="">
        <Button tag='a' className='feed-footer-btn w-100'>
          View all {props.feedType.toLowerCase()}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default HomeFeedCard;