import React, { PropTypes } from 'react';

import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import { Input } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { PageHeader } from 'react-bootstrap';

const Facilitator = ({ error, facilitator: { _id, name, phone, email }, handleUpdateFacilitator }) => (
    <div>
      <PageHeader>{ name }</PageHeader>

      <Row>
        <Col md={ 6 } mdOffset={ 3 } >
          <Panel>
            <PageHeader> Facilitator Info </PageHeader>
            { error ? <Alert bsStyle='danger'>{error}</Alert> : null }

            <form name='edit-facilitator' onSubmit={handleUpdateFacilitator.bind(null, _id)}>
              <Input type="text" name="name"
                placeholder="Facilitator X..."
                label="Name"
                defaultValue={name}/>
              <Input type="text" name="phone"
                placeholder="(076) 123 4567"
                label="Phone"
                defaultValue={phone} />
              <Input type="text" name="email"
                placeholder="email@address.com"
                label="Email"
                value={email} />
              <Button type="submit" bsStyle="default"> Save </Button>
            </form>
          </Panel>
        </Col>
      </Row>
  </div>
);

export default Facilitator;
