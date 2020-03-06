import React from 'react';
import Big from 'big.js'
import {
  Card,
  Button,
  CardHeader,
  CardBody,
  CardFooter,
} from 'reactstrap';


import { web3 } from '../../util/web3_util'
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
    }, 2 * 1000) //TODO change back to one sec 

    this.setState({ intervalID });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalID)
  }

  // Inputs: block and implicitly needs transactions from state
  // Return: total block reward
  // Side Effects: for blocks over a 100 seconds old that don't already have
  // a reward saved to state this function will dispatch an updated version of 
  // the block with the reward. Once the block is over 100 seconds and has a 
  // reward this function optimizes by simply returning that reward and skipping
  // calculations.
  // TODO - refactor to move this to utilities for reuse
  // Uses Big.js to keep track of large numbers
  // Note bn.js was having significant issues
  totalBlockReward(block) {

    // optimize by stopping calculations after block > 100 seconds
    const age = calculateTimeDiff(block)
    if (age > 100 && block.reward) return block.reward;
    const newBlock = { ...block }
    const { transactions } = this.props;
    // loop through txns and add up fees

    let txReward = new Big(0)
    block.transactions.forEach((txHash) => {
      if (transactions[txHash] && transactions[txHash].costOfGasUsed) {
        const costOfGasUsed = transactions[txHash].costOfGasUsed
        const bigcostOfGasUsed = new Big(costOfGasUsed)
        txReward = txReward.add(bigcostOfGasUsed)
      }
    });

    const txRewardEther = web3.utils.fromWei(txReward.toString(), 'ether')
    const bigTxRewardEther = new Big(txRewardEther)
    const bigRewardForUncles = new Big(block.uncles.length * (2 / 32), 10);
    const bigRewardForBlock = new Big(2)

    const total = bigRewardForBlock
      .add(bigRewardForUncles)
      .add(bigTxRewardEther)
      .toFixed(5)
      .toString()
    newBlock.reward = total;

    // save updated block to state to reduce future number of calculations
    // but we only do this once bc we return at the beggining if the block
    // is over 100 and has rewards calculated
    if (age > 100) this.props.receiveBlockReward(newBlock)

    return total;
  }

  mapItems() {  //TODO modify for Txns
    const { items } = this.props;
    return items.map((item, idx) => {
      // ternary goes here for block / txn items

      const mineTime = idx === items.length - 1 ? ('~15')
        : (timeDiff(items[idx], items[idx + 1]));

      const reward = this.totalBlockReward(item);
      const age = itemAgeToString(item);
      return (<BlockItem
        block={item}
        key={item.hash}
        age={age}
        mineTime={mineTime}
        reward={reward}
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

