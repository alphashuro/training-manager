import React from 'react';

import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Input } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { PageHeader } from 'react-bootstrap';


class NewFacilitator extends React.Component {
  render() {
    const {error} = this.props;
    return (
      <div>
        <PageHeader >
          <span>New Facilitator</span>
        </PageHeader>
        <Row >
          <Col md={ 6 }
               mdOffset={ 3 }
               >
              {error ? <Alert bsStyle="danger" >{error}</Alert> : null}
              <Input type="text"
                ref="nameRef"
                label="Name"
                placeholder="Enter the facilitator's name"
                ></Input>
              <Input type="text"
                ref="phoneRef"
                label="Phone"
                placeholder="Enter the facilitator's phone"
                ></Input>
              <Input type="email"
                ref="emailRef"
                label="Email"
                placeholder="Enter the facilitator's email"
                ></Input>
              <Button
                ref='saveRef'
                onClick={ this._createFacilitator.bind(this) }
                bsStyle="default"
                >
                <span >Save</span>
              </Button>
          </Col>
        </Row>
      </div>
    );
  }

  _createFacilitator() {
    const {create} = this.props;

    const { nameRef, emailRef, phoneRef } = this.refs;
    const name = nameRef.getValue();
    const email = emailRef.getValue();
    const phone = phoneRef.getValue();

    create( { name, phone, email } );
  }
}

export default NewFacilitator;
