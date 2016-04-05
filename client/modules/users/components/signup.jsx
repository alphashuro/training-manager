import React, {PropTypes} from 'react';
import { Grid, Row, Col, Well, Button, PageHeader, Input, Alert } from 'react-bootstrap';

const Signup = ({error, handleSignup}) => (
  <Grid className="signup">
    <Row>
      <Col md={6} mdOffset={3}>
      <Well>
        <PageHeader>Signup</PageHeader>
        {error ? <Alert bsStyle='danger'>{error}</Alert> : null}
        <form name="signup" onSubmit={handleSignup}>
          <Input type="email" name="email" placeholder="email@address.com"/>
          <Input type="password" name="password" placeholder="mypassword001"/>
          <Button type="submit">Signup</Button>
        </form>
        <Button href="/login">Login</Button>
      </Well>
      </Col>
    </Row>
  </Grid>
);

Signup.propTypes = {
  error: PropTypes.string,
  handleSignup: PropTypes.func.isRequired,
};

export default Signup;
