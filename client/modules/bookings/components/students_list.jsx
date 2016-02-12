import React, { Component } from 'react';

import { ListGroup } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';
import { Panel, PageHeader, Button, Badge } from 'react-bootstrap';

class StudentsList extends Component {
  render() {
    const {students} = this.props;

    return (
      <Panel>
        <PageHeader>
          <span>Students</span>
          <Button className='pull-right'>Add</Button>
        </PageHeader>
        <ListGroup>
          {
            students.map(student => (
              <ListGroupItem key={student._id}>
                <Badge>{student.clientId}</Badge>
                <p>{student.name}</p>
                <p>{student.phone}</p>
                <p>{student.email}</p>
                <Button bsStyle='danger'>Remove</Button>
              </ListGroupItem>
            ))
          }
        </ListGroup>
      </Panel>
    );
  }
}

export default StudentsList;
