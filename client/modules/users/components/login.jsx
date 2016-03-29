import React, {Component, PropTypes} from 'react';
import { Grid, Row, Col, Well, Button, PageHeader, Input, Alert } from 'react-bootstrap';

class Login extends Component {
  render() {
    const {error, handleLogin} = this.props;

    return (
      <Grid className='login'>
        <Row>
          <Col md={6} mdOffset={3}>
            <Well>
              <PageHeader>Login</PageHeader>
              {
                error ? <Alert bsStyle='danger'>{error}</Alert> : null
              }
              <Input
                name='email'
                id='email'
                type='email'
                ref={node => this.email = node}
                placeholder='Your email address.'/>
              <Input
                name='password'
                id='password'
                type='password'
                ref={node => this.password = node}
                placeholder='Your password.'/>
              <Button
                className='login'
                bsStyle='default'
                onClick={() => {
                  handleLogin(
                    this.email.getValue(),
                    this.password.getValue()
                  )
                }}>
                  Login
                </Button>
              <Button
                className='signup'
                bsStyle='default'
                href='/signup'>
                  Sign up
              </Button>
            </Well>
          </Col>
        </Row>
      </Grid>
    );
  }
}

Login.propTypes = {
  error: PropTypes.string,
  handleLogin: PropTypes.func.isRequired
};

export default Login;
