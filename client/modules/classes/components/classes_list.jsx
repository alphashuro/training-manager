import React, { PropTypes } from 'react';
import { Panel, PageHeader, Button, Input, ListGroup, ListGroupItem, Alert }
  from 'react-bootstrap';

import ClassesListItem from '../containers/classes_list_item';

const ClassesList = ({ classesIds, handleAddClass, courseId, error }) => (
  <Panel>
    <PageHeader>
      <span>Classes</span>
      <Button
        bsStyle="default"
        className="pull-right add"
        onClick={handleAddClass.bind(null, courseId)}
        >
        <span>Add</span>
      </Button>
    </PageHeader>
    { error ? <Alert bsStyle='danger'>{error}</Alert> : null}
    <ListGroup>
      { classesIds.map(id => <ClassesListItem _id={id} key={id} />) }
    </ListGroup>
  </Panel>
);

ClassesList.propTypes = {
  error: PropTypes.string,
  classesIds: PropTypes.array.isRequired,
  courseId: PropTypes.string.isRequired,
  handleAddClass: PropTypes.func.isRequired,
};

export default ClassesList;
