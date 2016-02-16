import React from 'react';
import { Grid, Row, Col, Well, Button, PageHeader, Input, Alert } from 'react-bootstrap';

class Login extends React.Component {
  render() {
    const {error} = this.props;
    return (
      <Grid className="login">
        <Row>
          <Col md={6} mdOffset={3}>
            <Well>
              <PageHeader>Login</PageHeader>
              {error ? <Alert bsStyle="danger">{error}</Alert> : null}

              <Input
                id='email'
                type="email"
                ref="emailRef"
                placeholder="Your email address."/>
              <Input
                id='password'
                type="password"
                ref="passwordRef"
                placeholder="Your password."/>
              <Button
                ref='login'
                className='login'
                bsStyle="default"
                onClick={ this._login.bind(this) }>
                  Login
                </Button>
              <Button
                className='signup'
                bsStyle="default"
                href="/signup">
                  Sign up
              </Button>
            </Well>
          </Col>
        </Row>
      </Grid>
    );
  }

  _login() {
    const {login} = this.props;
    const {emailRef, passwordRef} = this.refs;
    const email = emailRef.getValue();
    const password = passwordRef.getValue();
    login(email, password);
  }
}

export default Login;