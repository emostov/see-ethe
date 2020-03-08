import React from 'react';
import Big from 'big.js'
import {
  Card,
  Button,
  CardHeader,
  CardBody,
  CardFooter,
} from 'reactstrap';


import { web3, range } from '../../util/web3_util'
import BlockItem from './block_item'
import TransactionItem from './transaction_item'
import {
  calculateTimeDiff,
  itemAgeToString,
  timeDiff
} from '../../util/general_util'

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
    }, 1 * 1000) //TODO change back to one sec 

    this.setState({ intervalID });
  }
  componentWillUnmount() {
    clearInterval(this.state.intervalID)
  }

  mapItems() {
    const { items } = this.props;
    return items.map((item, idx) => {

      // if its the last block in the array we just need to estimate mine time
      const mineTime = idx === items.length - 1 ? ('~15')
        : (timeDiff(items[idx], items[idx + 1]));

      // const reward = this.totalBlockReward(item);
      const age = itemAgeToString(item);
      return (<BlockItem
        block={item}
        key={item.hash}
        age={age}
        mineTime={mineTime}
        reward={item.reward.slice(0, 7)}
      />)
    });
  }

  // only does 11 of the most recent transactions
  mapTransactions() {
    const { blocks, transactions } = this.props;
    let latestTxs = []
    const block = blocks[0]
    const age = itemAgeToString(block);
    const loop_len = block.transactions.length >= 10 ? 10 : block
    range(0, loop_len).forEach((i) => {
      const txHash = block.transactions[i];
      const tx = transactions[txHash];
      latestTxs.push(< TransactionItem tx={tx} age={age} key={txHash} />);
    })
    return latestTxs;
  }

  blockComponents() { //TODO modify for Txns
    const { items } = this.props;
    if (items === null || items.length < 1) { return '' }
    return this.mapItems()
  }

  // TODO dry up this code with block components
  transactionComponents() {
    const { blocks } = this.props;
    if (blocks === null || blocks.length < 1) { return '' }
    return this.mapTransactions()
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

              {feedType === 'Blocks' ? this.blockComponents()
                : this.transactionComponents()}

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

