import React, {Component} from 'react';

import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Input } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { PageHeader } from 'react-bootstrap';


class NewClient extends Component {
  render() {
    const {error} = this.props;
    return (
      <div>
        <PageHeader>
          <span>New Client</span>
        </PageHeader>
        <Row>
          <Col md={6} mdOffset={3}>
          {error ? <Alert bsStyle="danger">{error}</Alert> : null}
          <Input
            name='clientName'
            type="text"
            hasFeedback={false}
            placeholder="Enter the client's name"
            label="Name"
            ref={input => this.name = input}
            />
          <Input
            type="text"
            name='clientPhone'
            hasFeedback={false}
            placeholder="Enter the client's phone"
            label="Phone"
            ref={input => this.phone = input}
            />
          <Input
            type="email"
            name='clientEmail'
            hasFeedback={false}
            placeholder="Enter the client's email"
            label="Email"
            ref={input => this.email = input}
            />
          <Button
            className='save'
            onClick={() => {
              this.props.create(
                this.name.getValue(),
                this.phone.getValue(),
                this.email.getValue()
              )
            }}
            bsStyle="default" >
            <span>Save</span>
          </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default NewClient;
