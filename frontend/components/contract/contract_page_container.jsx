import { connect } from 'react-redux';
import {
  fetchPrices,
} from '../../actions/stats_actions';
import ContractPage from './contract_page';

const mapStateToProps = (state) => {
  const { ethusd } = state.entities.prices;
  return {
    ethusd,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchPrices: () => dispatch(fetchPrices()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContractPage);
