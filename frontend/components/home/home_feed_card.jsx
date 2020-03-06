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

const timeDiff = (curr, prev) => {
  return curr.timestamp - prev.timestamp
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
    const { items } = this.props;
    return items.map((item, idx) => {
      // ternary goes here for block / txn items

      const mineTime = idx === items.length - 1 ? ('~15')
        : (timeDiff(items[idx], items[idx + 1]))

      const age = itemAgeToString(item)
      return (<BlockItem
        block={item}
        key={item.hash}
        age={age}
        mineTime={mineTime}
      />)
    });

  }

  itemsComponents() { //TODO modify for Txns
    const { items, feedType } = this.props;
    if (items === null || items.length < 1) { return '' }
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

          <div className=''>
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

