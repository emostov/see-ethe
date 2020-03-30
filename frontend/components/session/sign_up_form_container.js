import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  signup, receiveErrors, clearSessionErrors
} from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
    formType: 'signup',
    // navLink: <Link to="/login">Click to Sign in</Link>,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processForm: (user) => dispatch(signup(user)),
    dispatchErrors: (errorsArray) => dispatch(receiveErrors(errorsArray)),
    clearErrors: () => dispatch(clearSessionErrors()),
    navLink: <Link
      to="/login"
      onClick={() => dispatch(clearSessionErrors())}
    >Click to Sign in</Link>,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);