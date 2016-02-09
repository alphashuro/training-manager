import React from 'react';

import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { PageHeader } from 'react-bootstrap';
import { Input } from 'react-bootstrap';

class NewBooking extends React.Component {
  getCoursesOptions() {
    const {courses} = this.props;
    return courses.map(course => (
      <option key={course._id} value={course._id}> {course.title} </option>
    ) );
  }

  getFacilitatorsOptions() {
    const {facilitators} = this.props;
    return facilitators.map(facilitator => (
      <option key={facilitator._id} value={facilitator._id}> {facilitator.name} </option>
    ));
  }

  render() {
    const {error} = this.props;

    return (
      <div>
        <PageHeader >
          <span >New Booking</span>
        </PageHeader>
        <Row >
          <Col md={ 6 }
               mdOffset={ 3 }
               >
            {error ? <Alert bsStyle="danger" >{error}</Alert> : null}

            <Input
              name="courseSelect"
              ref="courseSelectRef"
              type="select"
              label="Select Course"
              placeholder="Course"
              >
              { this.getCoursesOptions() }
              </Input>
            <Input
              name="facilitatorSelect"
              ref="facilitatorSelectRef"
              type="select"
              label="Select Facilitator"
              placeholder="Facilitator"
              >
              { this.getFacilitatorsOptions() }
            </Input>
            <Button onClick={ this._createBooking.bind(this) } bsStyle="default" >
              <span >Save</span>
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  _createBooking() {
    const {create} = this.props;

    const { courseSelectRef, facilitatorSelectRef } = this.refs;
    const courseId = courseSelectRef.getValue();
    const facilitatorId = facilitatorSelectRef.getValue();

    create( courseId, facilitatorId );
  }
}

export default NewBooking;
