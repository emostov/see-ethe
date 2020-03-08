import { RECEIVE_BLOCK, RECEIVE_TRANSACTION_RECEIPT } from '../actions/web3_actions';
import { mergeTxAndReciept } from '../util/web3_util';

const createNewStateWithTxReciept = (state, txReceipt) => {
  const { transactionHash } = txReceipt;
  const mergedTx = mergeTxAndReciept(state[transactionHash], txReceipt);
  const newState = { ...state, [transactionHash]: mergedTx };
  return newState;
};

const transactionsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_BLOCK:
      // check if the first transaction from block already exist
      if (state[Object.keys(action.txnsObject)[0]] !== undefined) return state;
      return { ...state, ...action.txnsObject };
    case RECEIVE_TRANSACTION_RECEIPT:
      // check if original tx exist before trying to merge reciept
      return (state[action.txReceipt.transactionHash] !== undefined) ? (
        createNewStateWithTxReciept(state, action.txReceipt)
      ) : (state);
    default:
      return state;
  };
};

export default transactionsReducer;