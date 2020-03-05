import React from 'react';
import { connect } from 'react-redux';

import { fetchBlocks } from '../actions/web3_actions'

class RunWeb3 extends React.Component {

  componentDidMount() {
    //this.props.fetchBlocks(100) 
    this.props.fetchBlocks(1) 
  }

  intervalFetch() {
    // set 
  }

  componentWillUnmount() {
    // take down interval Fetch
  }

  render() {
    return (
      <div id='run-web3'>
        {/* {this.props.fetchBlocks(3)} */}
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => ({
  fetchBlocks: (quantity) => dispatch(fetchBlocks(quantity)),
})

export default connect(null, mapDispatchToProps)(RunWeb3);

