
import React, { Component } from 'react';

import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import { Input } from 'react-bootstrap';
// import { ListGroup } from 'react-bootstrap';
// import { ListGroupItem } from 'react-bootstrap';
import { PageHeader } from 'react-bootstrap';

import ClassesList from '../../classes/containers/classes_list';

class Course extends Component {
  render() {
    const {error, course} = this.props;
    const { _id, title, description } = course;
    return (
      <div>
        <PageHeader>
          <span>{ title }</span>
        </PageHeader>

        <Row>
          <Col md={ 6 }>
          <Panel>
              <PageHeader>
                  <span>Course Info</span>
              </PageHeader>
              { error ? <Alert bsStyle='danger'>{error}</Alert> : null }
              <Input type="text"
                     hasFeedback={ false }
                     placeholder="Course title"
                     label="Title"
                     ref="titleRef"
                     defaultValue={title}
                    ></Input>
              <Input type="text"
                     hasFeedback={ false }
                     placeholder="Course description"
                     label="Description"
                     ref="descriptionRef"
                     defaultValue={description}
                    ></Input>
              <Button onClick={ this.saveCourse.bind(this) } bsStyle="default">
                  <span>Save</span>
              </Button>
          </Panel>
          </Col>
          <Col md={ 6 }>
            <ClassesList courseId={ _id } />
          </Col>
        </Row>
    </div>
    );
  }

  saveCourse() {
    const {update, courseId} = this.props;
    const {titleRef, descriptionRef,} = this.refs;

    const title = titleRef.getValue();
    const description = descriptionRef.getValue();

    update(courseId, { title, description });
  }
}

export default Course;

