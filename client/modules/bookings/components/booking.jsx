import React from 'react';

import { Alert } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';

import { PageHeader, FormControls } from 'react-bootstrap';

import StudentsList from '../containers/students_list';
import SessionsList from '../../sessions/containers/sessions_list';

const Booking = ({error, booking, course, facilitator}) => (
  <div>
    <PageHeader>
      <span>Booking</span>
    </PageHeader>

    <Row>
      <Col md={ 6 }>
        <Panel>
            <PageHeader>
                <span>Booking Info</span>
            </PageHeader>
            { error ? <Alert bsStyle='danger'>{error}</Alert> : null }

            <FormControls.Static
              className='course'
              label="Course"
              labelClassName="col-xs-2"
              wrapperClassName="col-xs-10"
              value={course.title} />
            <FormControls.Static
              className='facilitator'
              label="Facilitator"
              labelClassName="col-xs-2"
              wrapperClassName="col-xs-10"
              value={facilitator.name} />

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
