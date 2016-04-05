import React, { PropTypes } from 'react';
import {PageHeader,Alert, Input, Row, Col, Button} from 'react-bootstrap';

const NewCourse = ({ error, handleCreateCourse }) => (
  <div>
    <PageHeader> New Course </PageHeader>
    <Row>
      <Col md={ 6 } mdOffset={ 3 }>
        {error ? <Alert bsStyle="danger" >{error}</Alert> : null}

        <form name="new-course" onSubmit={handleCreateCourse}>
          <Input name='title' type="text" placeholder="Course X..." label="Title"/>
          <Input name='description' type="description" placeholder="..." label="Description"/>
          <Button type='submit' bsStyle="default"> Save </Button>
        </form>
      </Col>
    </Row>
  </div>
);

NewCourse.propTypes = {
  error: PropTypes.string,
  handleCreateCourse: PropTypes.func.isRequired,
};

export default NewCourse;
