import React, { Component } from 'react';

import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import { Input } from 'react-bootstrap';
// import { ListGroup } from 'react-bootstrap';
// import { ListGroupItem } from 'react-bootstrap';
import { PageHeader } from 'react-bootstrap';


class Client extends Component {
  render() {
    const {error, client} = this.props;
    const { name, email, phone } = client;
    return (
      <div>
        <PageHeader>
          <span>{ name }</span>
        </PageHeader>

        <Row>
          <Col md={ 6 }>
          <Panel>
              <PageHeader>
                  <span>Client Info</span>
              </PageHeader>
              { error ? <Alert bsStyle='danger'>{error}</Alert> : null }
              <Input type="text"
                     hasFeedback={ false }
                     placeholder="Client name"
                     label="Name"
                     ref="nameRef"
                     defaultValue={name}
                    ></Input>
              <Input type="text"
                     hasFeedback={ false }
                     placeholder="Client phone"
                     label="Phone"
                     ref="phoneRef"
                     defaultValue={phone}
                    ></Input>
              <Input type="text"
                     hasFeedback={ false }
                     placeholder="Client email"
                     label="Email"
                     ref="emailRef"
                     defaultValue={email}
                    ></Input>
              <Button onClick={ this.saveClient.bind(this) } bsStyle="default">
                  <span>Save</span>
              </Button>
          </Panel>
          </Col>
          <Col md={ 6 }>
          <Panel>
              <PageHeader>
                  <span>Students</span>
                  <Button bsStyle="default"
                          className="pull-right"
                         >
                      <span>Add</span>
                  </Button>
              </PageHeader>
              {/* Students List
              <ListGroup>
                {
                  students
                }
                  <ListGroupItem>
                      <Input type="text"
                             placeholder="Student Name"
                             label="Name"
                             value={student.name}
                            ></Input>
                      <Input type="text"
                             placeholder="Student Email"
                             label="Email"
                             value={student.email}
                            ></Input>
                      <Input type="text"
                             placeholder="Student Phone"
                             label="Phone"
                             value={student.phone}
                            ></Input>
                  </ListGroupItem>
              </ListGroup> */}
          </Panel>
          </Col>
        </Row>
    </div>
    );
  }

  saveClient() {
    const {update, clientId} = this.props;
    const {nameRef, emailRef, phoneRef} = this.refs;

    const name = nameRef.getValue();
    const email = emailRef.getValue();
    const phone = phoneRef.getValue();

    update(clientId, { name, email, phone });
  }
}

export default Client;

