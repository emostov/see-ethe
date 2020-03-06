
export const sliceToDisplayAddress = (address) => (address.length > 13 ? `${address.slice(0, 10)}...` : address);

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
  const diff = calculateTimeDiff(item);
  return minutesAndSeconds(diff);
};

// takes in blocks
export const timeDiff = (curr, prev) => curr.timestamp - prev.timestamp;