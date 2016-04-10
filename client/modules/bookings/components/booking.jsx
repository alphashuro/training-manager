import React from 'react';
import { Alert, Row, Col, Panel, PageHeader, FormControls } from 'react-bootstrap';
import StudentsList from '../containers/students_list';
import SessionsList from '../../sessions/containers/sessions_list';

const Booking = ({error, booking, course}) => (
  <div>
    <PageHeader>Booking</PageHeader>
    <Row>
      <Col md={ 6 }>
        <Panel>
            <PageHeader>Booking Info</PageHeader>
            { error ? <Alert bsStyle='danger'>{error}</Alert> : null }
            <FormControls.Static
              className='course'
              label="Course"
              labelClassName="col-xs-2"
              wrapperClassName="col-xs-10"
              value={course.title} />

        </Panel>
      </Col>
      <Col md={ 6 }>
        <StudentsList bookingId={booking._id} />
      </Col>
      <Col md={ 6 }>
        <SessionsList bookingId={booking._id} />
      </Col>
    </Row>
</div>
);

export default Booking;
