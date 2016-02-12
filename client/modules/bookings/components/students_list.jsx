import React, { Component } from 'react';

import { ListGroup } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';
import { Panel, PageHeader, Button, Badge } from 'react-bootstrap';

import AddStudentsModal from '../containers/add_students_modal';

class StudentsList extends Component {
  render() {
    const {students, bookingId} = this.props;

    return (
      <Panel>
        <PageHeader>
          <span>Students</span>
          <Button className='pull-right' onClick={this.addStudents.bind(this)}>Add</Button>
          <AddStudentsModal bookingId={bookingId} />
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

  addStudents() {
    const {showStudentsModal} = this.props;

    showStudentsModal();
  }
}

export default StudentsList;
