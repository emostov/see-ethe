import { connect } from 'react-redux';
import MyAccount from './my_account.jsx';


const mapStateToProps = (state) => ({
  user: state.entities.users[state.session.id],
});

export default connect(mapStateToProps, null)(MyAccount);

