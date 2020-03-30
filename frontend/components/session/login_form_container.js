import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';

import {
  login, receiveErrors, clearSessionErrors
} from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
    formType: 'login',
    // navLink: <Link to="/signup" onClick={() =>}>Click to sign up</Link>,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(login(user)),
    dispatchErrors: (errorsArray) => dispatch(receiveErrors(errorsArray)),
    clearErrors: () => dispatch(clearSessionErrors()),
    navLink: <Link to="/signup"
      onClick={() => dispatch(clearSessionErrors())}
    >Click to sign up</Link>,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);