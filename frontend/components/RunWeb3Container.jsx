import React from 'react';
import { connect } from 'react-redux';

import { fetchBlocks } from '../actions/web3_actions'

class RunWeb3 extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      intervalID: 0,
    }
  }

  componentDidMount() {
    //this.props.fetchBlocks(100) 
    // this.props.fetchBlocks(10)
    // this.props.fetchBlocks(5)
    this.props.fetchBlocks(1)
 

    // this.state.intervalID = setInterval(() => {
    //   this.props.fetchBlocks(1)
    // }, 3 * 1000)

    // // stop fetches so state does not get to bloated
    // setTimeout(() => {
    //   clearInterval(this.state.intervalID)
    // }, 5 * 60 * 1000)
  }

  componentWillUnmount() {
    // take down interval Fetch
    clearInterval(this.state.intervalID)
  }

  render() {
    return (
      <div id='run-web3'>

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchBlocks: (quantity) => dispatch(fetchBlocks(quantity)),
})

export default connect(null, mapDispatchToProps)(RunWeb3);

