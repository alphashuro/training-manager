import React from 'react';
import { Grid, Row, Col, Well, Button, PageHeader, Input, Alert } from 'react-bootstrap';

class Signup extends React.Component {
  render() {
    const {error} = this.props;
    return (
      <Grid className="signup">
        <Row>
          <Col md={6} mdOffset={3}>
          <Well>
            <PageHeader>Signup</PageHeader>
            {error ? <Alert bsStyle='danger'>{error}</Alert> : null}

            <Input type="email" ref="emailRef" placeholder="Enter your email."/>
            <Input type="password" ref="passwordRef" placeholder="Enter your password."/>
            <Input type="text" ref="orgRef" placeholder="Enter your organization name."/>
            <Button onClick={this._signup.bind(this)}>Signup</Button>
            <Button href="/login">Login</Button>
          </Well>
          </Col>
        </Row>
      </Grid>
    );
  }

  _signup() {
    const {signup} = this.props;
    const {emailRef, passwordRef, orgRef} = this.refs;
    const email = emailRef.getValue();
    const password = passwordRef.getValue();
    const org = orgRef.getValue();

    signup(email, password, org);
  }
}

export default Signup;
