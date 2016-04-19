import React, { PropTypes } from 'react';

import { Row, Col, Button, Input, Alert, PageHeader } from 'react-bootstrap';

const NewUser = ({error, handleCreateUser}) => (
  <div>
    <PageHeader> New User </PageHeader>
    <Row>
      <Col md={ 6 } mdOffset={ 3 }>
        {error ? <Alert bsStyle="danger" >{error}</Alert> : null}

        <form name="new-user" onSubmit={handleCreateUser}>
          <Input name='name' type="text" label="Name" placeholder="John Doe"/>
          <Input name='phone' type="text" label="Phone" placeholder="(073) 123 4567"/>
          <Input name='email' type="email" label="Email" placeholder="email@address.com"/>
          <Button type="submit" bsStyle="default"> Save </Button>
        </form>
      </Col>
    </Row>
  </div>
);

NewUser.propTypes = {
  error: PropTypes.string,
  handleCreateUser: PropTypes.func.isRequired,
};

export default NewUser;
