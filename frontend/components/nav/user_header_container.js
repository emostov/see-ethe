import { connect } from 'react-redux';

import { logout } from '../../actions/session_actions';
import UserHeader from './user_header';



const mapStateToProps = ({ session, entities: { users } }) => (
  { currentUser: users[session.id] }
);

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserHeader);
