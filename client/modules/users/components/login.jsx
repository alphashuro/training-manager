import React, { PropTypes } from 'react';
import { Grid, Row, Col, Well, Button, PageHeader, Input, Alert } from 'react-bootstrap';

const Login = ({error, handleLogin}) => (
  <Grid className='login'>
    <Row>
      <Col md={6} mdOffset={3}>
        <Well>
          <PageHeader>Login</PageHeader>
          { error ? <Alert bsStyle='danger'>{error}</Alert> : null }
          <form name='login' onSubmit={handleLogin}>
            <Input name='email' type='email' placeholder='Your email address.'/>
            <Input name='password' type='password' placeholder='Your password.'/>
            <Button bsStyle='default' type='submit'>
              Login
            </Button>
          </form>
          {/*<Button className='signup' bsStyle='default' href='/signup'>
              Sign up
          </Button>*/}
        </Well>
      </Col>
    </Row>
  </Grid>
);

Login.propTypes = {
  error: PropTypes.string,
  handleLogin: PropTypes.func.isRequired
};

export default Login;
