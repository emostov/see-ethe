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


// utility functions
// TODO move these to a utility file
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

export default class HomeFeedCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      intervalID: 0,
      count: 0,
    }

    this.setState = this.setState.bind(this);
  }

  componentDidMount() {

    const intervalID = setInterval(() => {
      this.setState({
        count: this.state.count + 1
      })
    }, 1000)

    this.setState({ intervalID });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalID)
  }

  mapItems() {  //TODO modify for Txns
    return this.props.items.map((item) => {
      const age = itemAgeToString(item)

      // ternary goes here for block / txn items
      return <BlockItem block={item} key={item.hash} age={age} />
    });

  }

  itemsComponents() { //TODO modify for Txns
    const { items, feedType } = this.props;
    if (items === null) { return '' }
    return feedType === 'Blocks' ? (
      this.mapItems()

    ) : (
        ""
      )
  }

  render() {
    const { feedType } = this.props
    return (
      <Card className='h-100'>
        <CardHeader tag="h3" className='card-header-title'>
          Latest {feedType}
        </CardHeader>
        <CardBody className='card-scroll-holder'>

          <div className='scroll-container'>
            <div className='scroll-items-container'>
              {this.itemsComponents()}

            </div>
          </div>

        </CardBody>
        <CardFooter className="">
          <Button tag='a' className='feed-footer-btn w-100'>
            View all {feedType.toLowerCase()}
          </Button>
        </CardFooter>
      </Card>
    )
  }
}

