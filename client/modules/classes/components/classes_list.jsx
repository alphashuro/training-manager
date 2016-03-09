import React, { Component } from 'react';
import { Panel, PageHeader, Button, Input, ListGroup, ListGroupItem, Alert }
  from 'react-bootstrap';

import ClassesListItem from '../containers/classes_list_item';

const ClassesList = ({
  classesIds,
  addClass,
  courseId,
  error
}) => (
  <Panel>
    <PageHeader>
      <span>Classes</span>
      <Button
        bsStyle="default"
        className="pull-right add"
        onClick={() => {
          addClass(courseId)
        }}
        >
        <span>Add</span>
      </Button>
    </PageHeader>
    { error ? <Alert bsStyle='danger'>{error}</Alert> : null}
    <ListGroup>
      {
        classesIds.map(id => (
          <ClassesListItem
            _id={id}
            key={id} />
        ))
      }
    </ListGroup>
  </Panel>
);

export default ClassesList;
