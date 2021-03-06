/* eslint-disable no-console */
/* eslint-disable no-undef */
import Web3 from 'web3';

import { ABIOBJ, etherWrapAddress } from '../contract/ether_wrap';

export function isConnected() {
  return (typeof window.ethereum !== 'undefined');
};

export function runContractWrite(methodCB, otherOptions) {
  // request user sign in
  window.ethereum.enable().then((accounts) => {
    // create instance with user provided connection
    const cWeb3 = new Web3(Web3.givenProvider);
    const options = { from: accounts[0], gas: 10 * 21000 };
    const combinedOptions = { ...options, ...otherOptions };
    const contract = new cWeb3.eth.Contract(ABIOBJ, etherWrapAddress);
    methodCB(combinedOptions, contract);
  }).catch((err) => {
    console.log('enable err: ', err);
  });
}

// below are functions for the weth contract
export const deposit = (success) => (options, contract) => {
  contract.methods.deposit()
    .send(options, (err, res) => {
      if (!err) {
        success(res);
        return res;
      }
      console.log('execution err: ', err);
      return err;
    })
    .catch((err) => console.log('caught err: ', err));
};

export const withdraw = (success, wad) => (options, contract) => {
  contract.methods.withdraw(wad)
    .send(options, (err, res) => {
      if (!err) {
        success(res);
        return res;
      }
      console.log('execution err: ', err);
      return err;
    })
    .catch((err) => console.log('caught err: ', err));
};
