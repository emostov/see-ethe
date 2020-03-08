import { combineReducers } from 'redux';

import users from './users_reducer';
import blocks from './blocks_reducer';
import blockHashes from './block_hashes_reducer';
import transactions from './transactions_reducer';
import totalSupply from './total_supply_reducer';
import prices from './prices_reducer';

export default combineReducers({
  users,
  blocks,
  blockHashes,
  transactions,
  prices,
  totalSupply,
});
