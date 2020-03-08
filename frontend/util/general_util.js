import Big from 'big.js';
import { web3 } from './web3_util';

export const sliceToDisplayAddress = (address) => {
  if (!(address && address.length)) return '';
  return address.length > 13 ? `${address.slice(0, 10)}...` : address;
};

export const minutesAndSeconds = (nSeconds) => {
  const minutes = Math.floor(nSeconds / 60);
  const seconds = nSeconds - (minutes * 60);
  const minuteStr = minutes === 0 ? '' : `${minutes} min`;
  const secondStr = `${seconds} seconds ago`;
  return `${minuteStr} ${secondStr}`;
};


// takes in block
export const calculateTimeDiff = (item) => {
  // both curr and timestamp are unix time in seconds
  const { timestamp } = item;
  const curr = Math.round((new Date()).getTime() / 1000);
  const delta = curr - timestamp;
  return delta;
};

// takes in block
export const itemAgeToString = (item) => {
  if (!item) return '';
  const diff = calculateTimeDiff(item);
  return minutesAndSeconds(diff);
};

// takes in blocks
export const timeDiff = (curr, prev) => curr.timestamp - prev.timestamp;

export const calculateUpdatedRewad = (block, transaction) => {
  // some validating
  if (block && block.reward && !transaction) return block.reward;
  if (!block) return '2';
  // if (!block.reward) return '2';
  const costEthe = web3.utils.fromWei(
    transaction.costOfGasUsed.toString(),
    'ether',
  );
  const bigCost = new Big(costEthe, 10);

  // if for some reason block does not have reward assume its 2

  const blockReward = block.reward ? block.reward : 2;
  const bigReward = new Big(blockReward, 10).toString();

  const newReward = bigCost.add(bigReward);
  return newReward.toString();
}