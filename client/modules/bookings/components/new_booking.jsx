import React, { PropTypes } from 'react';

import { Row, Col, Button, Alert, PageHeader, Input } from 'react-bootstrap';

const NewBooking = ({error, courses, facilitators, handleCreateBooking}) => (
  <div>
    <PageHeader> New Booking </PageHeader>
    <Row>
      <Col md={ 6 } mdOffset={ 3 }>
        {error ? <Alert bsStyle="danger">{error}</Alert> : null}

        <form name='new-booking' onSubmit={handleCreateBooking}>
          <Input
            type="select"
            name="course"
            label="Select Course"
            placeholder="Course X..."
            >
            {
              courses.map(course => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))
            }
            </Input>
          <Input
            type="select"
            name="facilitator"
            label="Select Facilitator"
            placeholder="Facilitator Y..."
            >
            {
              facilitators.map(facilitator => (
                <option key={facilitator._id} value={facilitator._id}>
                  {facilitator.name}
                </option>
              ))
            }
          </Input>
          <Button type='submit' bsStyle="default"> Save </Button>
        </form>
      </Col>
    </Row>
  </div>
);

NewBooking.propTypes = {
  courses: PropTypes.array,
  facilitators: PropTypes.array,
  error: PropTypes.string,
  handleCreateBooking: PropTypes.func.isRequired,
};

export default NewBooking;
