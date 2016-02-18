import React, { Component } from 'react';

import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import { Input } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { PageHeader } from 'react-bootstrap';

class Facilitator extends Component {
  render() {
    const {error, facilitator} = this.props;
    const email = facilitator.emails[0].address;
    const { name, phone } = facilitator.profile;
    return (
      <div>
        <PageHeader>
          <span>{ name }</span>
        </PageHeader>

        <Row>
          <Col md={ 6 } mdOffset={ 3 } >
          <Panel>
              <PageHeader>
                  <span>Facilitator Info</span>
              </PageHeader>
              { error ? <Alert bsStyle='danger'>{error}</Alert> : null }
              <Input type="text"
                     ref="nameRef"
                     placeholder="Facilitator name"
                     label="Name"
                     defaultValue={name}
                    ></Input>
              <Input type="text"
                     ref="phoneRef"
                     placeholder="Facilitator phone"
                     label="Phone"
                     defaultValue={phone}
                    ></Input>
              <Input type="text"
                     ref="emailRef"
                     placeholder="Facilitator email"
                     label="Email"
                     defaultValue={email}
                     value={email}
                    ></Input>
              <Button
                ref='saveRef'
                onClick={ this.saveFacilitator.bind(this) }
                bsStyle="default">
                  <span>Save</span>
              </Button>
          </Panel>
          </Col>
        </Row>
    </div>
    );
  }

  saveFacilitator() {
    const {update, facilitator} = this.props;
    const {nameRef, phoneRef} = this.refs;

    const name = nameRef.getValue();
    const phone = phoneRef.getValue();

    update(facilitator._id, { name, phone });
  }
}

export default Facilitator;

