import React, {PropTypes} from 'react';

import { Row, Col, Button, Input, Alert, PageHeader } from 'react-bootstrap';

const NewClient = ({error, handleCreateClient}) => (
  <div>
    <PageHeader> New Client </PageHeader>
    <Row>
      <Col md={6} mdOffset={3}>
      {error ? <Alert bsStyle="danger">{error}</Alert> : null}

      <form name="new-client" onSubmit={handleCreateClient}>
        <Input
          type="text" name="name"
          placeholder="Client 1..."
          label="Name"
          />
        <Input
          type="text" name="phone"
          placeholder="(016) 123 4567"
          label="Phone"
          />
        <Input
          type="email" name="email"
          placeholder="email@address.com"
          label="Email"
          />
        <Button type='submit' bsStyle="default"> Save </Button>
      </form>
      </Col>
    </Row>
  </div>
);

NewClient.propTypes = {
  error: PropTypes.string,
  handleCreateClient: PropTypes.func.isRequired,
};

export default NewClient;
