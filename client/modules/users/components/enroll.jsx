import React, { PropTypes } from 'react';

import { Grid, Row, Col, Well, Button, PageHeader, Input, Alert } from 'react-bootstrap';

const Enroll = ({error, username, token, handleSubmit}) => (
  <Grid>
    <Row>
      <Col md={6} mdOffset={3}>
        <Well>
          <PageHeader>Set your new password.<br/> <small>{username}</small></PageHeader>
          { error ? <Alert bsStyle='danger'>{error}</Alert> : null}
          <form name="enroll" onSubmit={handleSubmit.bind(null, token)}>
            <Input name="password" type="password" placeholder="new password"/>
            <Input name="confirm" type="password" placeholder="confirm password"/>
            <Button type="submit" bsStyle='default'>Save</Button>
          </form>
        </Well>
      </Col>
    </Row>
  </Grid>
);

Enroll.propTypes = {
  error: PropTypes.string,
  username: PropTypes.string,
  token: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
};

export default Enroll;
