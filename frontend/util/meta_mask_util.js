const mMIsInstalled = () => {
  if (typeof web3 !== 'undefined') { console.log('MetaMask is installed') }
  else { alert('MetaMask is not installed') }
}