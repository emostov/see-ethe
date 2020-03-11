import React from "react";
import ReactDOM from "react-dom";

import configureStore from './store/store'
import Root from './components/root'
import * as Web3Util from './util/web3_util';
import EtherWrap from './contract/ether_wrap';

// good address for balanceOf for etherwrap
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');

  let store;
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: { id: window.currentUser.id }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }


  ReactDOM.render(<Root store={store} />, root);

  console.log(EtherWrap.options.address)
  // console.log(EtherWrap)



  EtherWrap.methods
    .totalSupply()
    .call()
    .then(console.log)

  EtherWrap.methods
    .name()
    .call()
    .then(console.log)

  EtherWrap.methods
    .decimals()
    .call()
    .then(console.log)
  
  EtherWrap.methods
    .balanceOf('0x21d15d354De0DC27a0A79eC2871606Ea78532052')
    .call()
    .then(console.log)
  
  
});

  // console.log(EtherWrap.options.gasPrice)
  // console.log(EtherWrap.methods.address)
  // console.log(EtherWrap.options.jsonInterface)
  
  // EtherWrap.methods.owner().call().then(console.log);