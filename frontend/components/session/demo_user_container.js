import { connect } from 'react-redux';
// import React from 'reasct';
import { login } from '../../actions/session_actions';
import DemoUser from './demo_user';

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(login(user)),
});

export default connect(null, mapDispatchToProps)(DemoUser);

