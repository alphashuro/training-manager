import React, { PropTypes } from 'react';

import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Input } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { PageHeader } from 'react-bootstrap';

const NewFacilitator = ({error, handleCreateFacilitator}) => (
  <div>
    <PageHeader> New Facilitator </PageHeader>
    <Row>
      <Col md={ 6 } mdOffset={ 3 }>
        {error ? <Alert bsStyle="danger" >{error}</Alert> : null}

        <form name="new-facilitator" onSubmit={handleCreateFacilitator}>
          <Input name='name' type="text" label="Name" placeholder="John Doe"/>
          <Input name='phone' type="text" label="Phone" placeholder="(073) 123 4567"/>
          <Input name='email' type="email" label="Email" placeholder="email@address.com"/>
          <Button type="submit" bsStyle="default"> Save </Button>
        </form>
      </Col>
    </Row>
  </div>
);

NewFacilitator.propTypes = {
  error: PropTypes.string,
  handleCreateFacilitator: PropTypes.func.isRequired,
};

export default NewFacilitator;
