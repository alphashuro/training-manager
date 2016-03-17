import React from 'react';

import { ListGroup } from 'react-bootstrap';
import { Panel, PageHeader, Button, Alert } from 'react-bootstrap';
import AddStudentsModal from '../containers/add_students_modal';
import StudentsListItem from '../containers/students_list_item';

const StudentsList = ({studentIds, bookingId, error, showStudentsModal}) => (
  <Panel>
    <PageHeader>
      <span>Students</span>
      <Button
      className='pull-right show-add-students-modal add-students'
      onClick={showStudentsModal.bind(this)}>
        Add
      </Button>
      <AddStudentsModal
      bookingId={bookingId} />
    </PageHeader>
    { error ? <Alert>{error}</Alert> : null }
    <ListGroup>
      {
        studentIds.map(id => (
          <StudentsListItem
          key={id}
          studentId={id}
          bookingId={bookingId}
          />
        ))
      }
    </ListGroup>
  </Panel>
);

export default StudentsList;
