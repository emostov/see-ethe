export const RECEIVE_PRICE = 'RECEIVE_PRICE';
export const RECEIVE_TOTAL_SUPPLY = 'RECEIVE_TOTAL_SUPPLY';

export const receievPrice = (price) => ({
  type: RECEIVE_PRICE,
  price,
});

export const receoveTotalSupply = (supply) => ({
  type: RECEIVE_TOTAL_SUPPLY,
  supply,
});
