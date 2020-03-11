import React from "react";
import ReactDOM from "react-dom";

import configureStore from './store/store'
import Root from './components/root'
import * as Web3Util from './util/web3_util';
import EtherWrap from './contract/ether_wrap';

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

  // console.log(EtherWrap.options.address)
  // console.log(EtherWrap)
  console.log(EtherWrap._jsonInterface)
  console.log(EtherWrap.methods)
  EtherWrap
    .methods
    .name()
    .call()
    .then(console.log);
});