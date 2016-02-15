import React from 'react';

import { Panel, PageHeader, Button, ListGroup, Alert }
  from 'react-bootstrap';

import StudentsListItem from '../containers/students_list_item';

const StudentsList = ({ error, studentIds, create, clientId }) => (
  <Panel>
    <PageHeader>
      <span>Students</span>
      <Button bsStyle="default"
        className="pull-right"
        onClick={ create.bind(this, clientId) }
        >
        <span>Add</span>
      </Button>
    </PageHeader>
    { error ? <Alert bsStyle='danger'>{error}</Alert> : null}
    <ListGroup>
      {
        studentIds.map(id => (
          <StudentsListItem
            key={ id }
            studentId={id} />
        ))
      }
    </ListGroup>
  </Panel>
);

export default StudentsList;
