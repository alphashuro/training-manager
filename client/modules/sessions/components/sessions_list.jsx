import React, { Component } from 'react';

import { ListGroup } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';
import { Panel, PageHeader, Alert } from 'react-bootstrap';
import moment from 'moment';

import DateTime from 'react-bootstrap-datetimepicker';

class SessionsList extends Component {
  render() {
    const {sessions, error} = this.props;

    return (
      <Panel>
        <PageHeader>
          <span>Sessions</span>
        </PageHeader>
        { error ? <Alert>{error}</Alert> : null }
        <ListGroup>
          {
            sessions.map(session => (
             <SessionListItem
              key={session._id}
              session={session}
              onDateChanged={this._sessionDateChanged.bind(this)}/>
            ))
          }
        </ListGroup>
      </Panel>
    );
  }

  _sessionDateChanged(e) {
    const {update} = this.props;
    const id = e.sessionId;
    const {date} = e;
    update(id, {date});
  }
}

class SessionListItem extends Component {
  render() {
    const {session} = this.props;
    return (
      <ListGroupItem >
        <DateTime
          dateTime={moment(session.date).format('x')}
          inputFormat="llll"
          daysOfWeekDisabled={[ 0, 6 ]}
          minDate={moment()}
          onChange={this._dateChanged.bind(this)}
          format="x"/>
        <p>{moment(session.date).calendar()}</p>
        <p>{session.classId}</p>
      </ListGroupItem>
    );
  }

  _dateChanged(e) {
    const {session, onDateChanged} = this.props;
    const _id = session._id;
    const date = moment(Number(e)).toDate();
    onDateChanged({
      sessionId: _id,
      date
    });
  }
}

export default SessionsList;
