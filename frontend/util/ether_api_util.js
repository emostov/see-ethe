const lru = '2SYRDUTMP7IE7BMYWE79IH6BYPVJTIY49W';

const getLastPrice = `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${lru}`;
const getTotalSupply = `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${lru}`;

export const lastPrice = () => (
  $.ajax({
    method: 'GET',
    url: getLastPrice,
  })
);

export const totalSupply = () => (
  $.ajax({
    method: 'GET',
    url: getTotalSupply,
  })
)