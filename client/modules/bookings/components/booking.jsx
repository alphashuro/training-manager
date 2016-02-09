import React, { Component } from 'react';

import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';

import { PageHeader, FormControls } from 'react-bootstrap';

import StudentsList from './students_list.jsx';

class Booking extends Component {
  render() {
    const {error, booking} = this.props;
    return (
      <div>
        <PageHeader>
          <span>{ name }</span>
        </PageHeader>

        <Row>
          <Col md={ 6 }>
            <Panel>
                <PageHeader>
                    <span>Booking Info</span>
                </PageHeader>
                { error ? <Alert bsStyle='danger'>{error}</Alert> : null }

                <FormControls.Static label="Course" labelClassName="col-xs-2" wrapperClassName="col-xs-10" value={booking.courseId} />
                <FormControls.Static label="Facilitator" labelClassName="col-xs-2" wrapperClassName="col-xs-10" value={booking.facilitatorId} />

            </Panel>
          </Col>
          <Col md={ 6 }>
            <Panel>
                <PageHeader>
                    <span>Students</span>
                    <Button bsStyle="default"
                            className="pull-right"
                           >
                        <span>Add</span>
                    </Button>
                </PageHeader>
                <StudentsList />
            </Panel>
          </Col>
          <Col md={ 6 }>
            <Panel>
                <PageHeader>
                    <span>Sessions</span>
                </PageHeader>
                <StudentsList />
            </Panel>
          </Col>
        </Row>
    </div>
    );
  }

  saveBooking() {
    const {update, bookingId} = this.props;
    const {nameRef, emailRef, phoneRef} = this.refs;

    const name = nameRef.getValue();
    const email = emailRef.getValue();
    const phone = phoneRef.getValue();

    update(bookingId, { name, email, phone });
  }
}

export default Booking;

