import React, {PropTypes} from 'react';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Panel} from 'react-bootstrap';
import {Input} from 'react-bootstrap';
import {PageHeader} from 'react-bootstrap';
import {Alert} from 'react-bootstrap';

import ClassesList from '../../classes/containers/classes_list';

const Course = ({ error, handleUpdate, course: { _id, title, description } }) => (
  <div>
    <PageHeader>
      <span>{title}</span>
    </PageHeader>
    <Row>
      <Col md={6}>
        <Panel>
          <PageHeader>
            <span>Course Info</span>
          </PageHeader>
          {error ? <Alert bsStyle='danger'>{error}</Alert> : null}
          <form name='edit-course' onSubmit={handleUpdate.bind(_id)}>
            <Input name='title' type="text" placeholder="Course A.." label="Title" defaultValue={title}/>
            <Input name='description' type="text" placeholder="In this course you will learn..." label="Description" defaultValue={description}/>
            <Button type='submit' bsStyle="default">Save</Button>
          </form>
        </Panel>
      </Col>
      <Col md={6}>
        <ClassesList courseId={_id}/>
      </Col>
    </Row>
  </div>
);

Course.propTypes = {
  error: PropTypes.string,
  course: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
  handleUpdate: PropTypes.func.isRequired,
};

export default Course;
