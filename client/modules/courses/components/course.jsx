import React, {PropTypes} from 'react';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Panel} from 'react-bootstrap';
import {Input} from 'react-bootstrap';
import {PageHeader} from 'react-bootstrap';
import {Alert} from 'react-bootstrap';

import ClassesList from '../../classes/containers/classes_list';

const Course = React.createClass({
  propTypes: {
    error: PropTypes.string,
    course: PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string
    })
  },

  render() {
    const {error, course} = this.props;
    const {_id, title, description} = course;
    return (
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
              <Input
              type="text"
              hasFeedback={false}
              placeholder="Course title"
              label="Title"
              ref={node => this.title = node}
              defaultValue={title}></Input>
              <Input
              type="text"
              hasFeedback={false}
              placeholder="Course description"
              label="Description"
              ref={node => this.description = node}
              defaultValue={description}></Input>
              <Button
              className='save'
              onClick={() => {
                const {update, course} = this.props;
                console.log(this.title);
                update(course._id, {
                  title: this.title.getValue(),
                  description: this.description.getValue()
                });
              }}
              bsStyle="default">
                <span>Save</span>
              </Button>
            </Panel>
          </Col>
          <Col md={6}>
            <ClassesList courseId={_id}/>
          </Col>
        </Row>
      </div>
    );
  }
});

export default Course;
