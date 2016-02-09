import React from 'react';

import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Input } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { PageHeader } from 'react-bootstrap';


class NewClient extends React.Component {
  render() {
    const {error} = this.props;
    return (
      <div>
        <PageHeader >
          <span >New Client</span>
        </PageHeader>
        <Row >
          <Col md={ 6 }
               mdOffset={ 3 }
               >
              {error ? <Alert bsStyle="danger" >{error}</Alert> : null}
              <Input type="text"
                hasFeedback={ false }
                placeholder="Enter the client's name"
                label="Name"
                ref="nameRef"
                ></Input>
              <Input type="text"
                hasFeedback={ false }
                placeholder="Enter the client's phone"
                label="Phone"
                ref="phoneRef"
                ></Input>
              <Input type="email"
                hasFeedback={ false }
                placeholder="Enter the client's email"
                label="Email"
                ref="emailRef"
                ></Input>
              <Button onClick={ this._createClient.bind(this) } bsStyle="default" >
                <span >Save</span>
              </Button>
          </Col>
        </Row>
      </div>
    );
  }

  _createClient() {
    const {create} = this.props;

    const { nameRef, emailRef, phoneRef } = this.refs;
    const name = nameRef.getValue();
    const email = emailRef.getValue();
    const phone = phoneRef.getValue();

    create( name, email, phone );
  }
}

export default NewClient;
