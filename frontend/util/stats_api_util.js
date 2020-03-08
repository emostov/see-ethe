const lru = '2SYRDUTMP7IE7BMYWE79IH6BYPVJTIY49W';

const getLastPrices = `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${lru}`;
const getTotalSupply = `https://api.etherscan.io/api?module=stats&action=ethsupply&apikey=${lru}`;

export const lastPrices = () => (
  $.ajax({
    method: 'GET',
    url: getLastPrices,
  })
);

export const totalSupply = () => (
  $.ajax({
    method: 'GET',
    url: getTotalSupply,
  })
);

// https://github.com/Blockchair/Blockchair.Support/blob/master/API_DOCUMENTATION_EN.md#link_002
export const blockChairStats = () => (
  $.ajax({
    method: 'GET',
    url: 'https://api.blockchair.com/ethereum/stats',
  })
);
