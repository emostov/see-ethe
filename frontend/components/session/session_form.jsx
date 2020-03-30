import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, Alert, Container } from 'reactstrap';
import DemoUserContainer from './demo_user_container';


class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.props.formType
    this.props.formType == 'login' ? (
      this.state = { username: '', password: '' }
    ) : (
        this.state = { username: '', password: '', email: '', checkPassword: '' }
      )

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps){
    if (this.props.formType !== prevProps.formType){
      this.props.clearErrors();
    }
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }


  // check for password match if creating account
  handleSubmit(e) {
    e.preventDefault();
    const { username, password, email, checkPassword } = this.state
    this.props.clearErrors();
    if (this.props.formType == 'login') {
      this.props.processForm({ username, password });
    } else if (checkPassword !== password) {
      this.props.dispatchErrors(['Passwords did not match'])
    } else {
      this.props.processForm({ username, password, email })
    }
    
  }

  renderErrors() {
    const msgs =  (
      <ul>
        {this.props.errors.map((error, i) => (
          <li className='session-form-error' key={i}>
            <Alert color="danger">
              {error}
            </Alert>
          </li>
        ))}
      </ul>
    );

    return msgs;

  }


  formHeaderText() {
    return this.props.formType == 'login' ? (
      <div className='session-form-header'>
        <h3>Welcome <span>back</span></h3>
        <p className="std-ft-size">Login to your account</p>
      </div>
    ) : (
        <div className='session-form-header'>
          <h3>
            Register a <span>New</span> Account
          </h3 >
          <p className="std-ft-size">Fill out the form to get started.</p>
        </div>
      )
  }

  submitBtnText() {
    return this.props.formType == 'login' ? 'LOGIN' : 'Create An Account'
  }

  navTextLinkAndSubmit() {
    const textInner = this.props.formType == 'login' ?
      (
        <span>Don't Have an Account?</span>
      ) : (
        <span> Already have an Account?</span>
      )

    return (
      <div className='form-nav-text-and-link' className="std-ft-size" >

          <Row >
            <Col>
              {textInner}
              <br />
              {this.props.navLink}
            </Col>
            <Col>
              <div className='flex-right'>
                <Button className="std-ft-size" size="sm" type='submit' color="primary">
                  {this.submitBtnText()}
                </Button>
              </div>
            </Col>
          </Row>

      </div>
    )
  }

  passwordSectionSignup() {
    return this.props.formType == 'login' ?
      (
        ''
      ) : (
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="passwordField">Password</Label>
              <Input type="password" name="password"
                id="passwordField" placeholder='******'
                value={this.state.password}
                onChange={this.update('password')}
              />
            </FormGroup>
          </Col >
          <Col md={6}>
            <FormGroup>
              <Label for="checkPasswordField">Confirm Password</Label>
              <Input type="password" name="confirmPassword"
                id="checkPasswordField" placeholder="******"
                value={this.state.checkPassword}
                onChange={this.update('checkPassword')}
              />
            </FormGroup>
          </Col>
        </Row >
      )
  }

  passwordSectionLogin() {
    return this.props.formType == 'login' ?
      (
        <FormGroup>
          <Label for="passwordField">Password</Label>
          <Input type="password" name="password"
            id="passwordField" placeholder='******'
            value={this.state.password}
            onChange={this.update('password')}
          />
        </FormGroup>
      ) : ('')
  }

  emailInput() {
    return this.props.formType == 'login' ? '' : (
      <FormGroup>
        <Label for="email">Email</Label>
        <Input type="email" name="email" id="email"
          placeholder="Only need to add if you want to see bonus features"
          onChange={this.update('email')}
          className="login-input"
        />
      </FormGroup>
    )
  }

  checkboxSignup() {
    return this.props.formType == 'login' ? '' : (
      <div>
        <FormGroup check>
          <Label check>
            <Input className='ft-gry' type="checkbox" />{' '}
            I agree to terms and condition (not functional)
           </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input className='ft-gry' type="checkbox" />{' '}
            I agree to receive newsletter (not functional)
           </Label>
        </FormGroup>
      </div>
    )
  }

  form() {
    return (
      <Form onSubmit={this.handleSubmit} >
        <FormGroup>
          <Label className='form-text' for="username">Username</Label>
          <Input type="text" name="username"
            id="username"
            placeholder="Username has to be 5 to 30 characters in length, only alphanumeric characters"
            value={this.state.username}
            onChange={this.update('username')}
          />
        </FormGroup>
        {this.emailInput()}
        {this.passwordSectionSignup()}
        {this.passwordSectionLogin()}
        {this.checkboxSignup()}
        <br />
        {this.navTextLinkAndSubmit()}
      </Form>
    )
  }

  render() {
    return (
      <div className="session-form-container">

        {this.formHeaderText()}
        {this.renderErrors()}
        {this.form()}
        <div className="flex-center">
          <DemoUserContainer />
        </div>

      </div>
    );
  }
}



export default SessionForm;
