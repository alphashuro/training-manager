
import React, { Component } from 'react';

import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import { Input } from 'react-bootstrap';
// import { ListGroup } from 'react-bootstrap';
// import { ListGroupItem } from 'react-bootstrap';
import { PageHeader } from 'react-bootstrap';


class Facilitator extends Component {
  render() {
    const {error, facilitator} = this.props;
    const { name, email, phone } = facilitator;
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
                     hasFeedback={ false }
                     placeholder="Facilitator name"
                     label="Name"
                     ref="nameRef"
                     defaultValue={name}
                    ></Input>
              <Input type="text"
                     hasFeedback={ false }
                     placeholder="Facilitator phone"
                     label="Phone"
                     ref="phoneRef"
                     defaultValue={phone}
                    ></Input>
              <Input type="text"
                     hasFeedback={ false }
                     placeholder="Facilitator email"
                     label="Email"
                     ref="emailRef"
                     defaultValue={email}
                    ></Input>
              <Button onClick={ this.saveFacilitator.bind(this) } bsStyle="default">
                  <span>Save</span>
              </Button>
          </Panel>
          </Col>
        </Row>
    </div>
    );
  }

  saveFacilitator() {
    const {update, facilitatorId} = this.props;
    const {nameRef, emailRef, phoneRef} = this.refs;

    const name = nameRef.getValue();
    const email = emailRef.getValue();
    const phone = phoneRef.getValue();

    update(facilitatorId, { name, email, phone });
  }
}

export default Facilitator;

