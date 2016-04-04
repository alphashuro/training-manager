import React, { PropTypes } from 'react';

import {ListGroupItem} from 'react-bootstrap';
import DateTimeField from 'react-bootstrap-datetimepicker';
import moment from 'moment';

const SessionsListItem = ({ _id, date, handleDateChange }) => (
  <ListGroupItem>
    <DateTimeField
      name='session-date'
      dateTime={moment(date).format('x')}
      inputFormat='llll'
      daysOfWeekDisabled={[ 0, 6 ]}
      minDate={moment()}
      onChange={handleDateChange.bind(null, _id)}
      format="x"
      />
    <p>{moment(date).calendar()}</p>
  </ListGroupItem>
);

SessionsListItem.propTypes = {
  date: PropTypes.any,
  _id: PropTypes.string.isRequired,
  handleDateChange: PropTypes.func.isRequired,
};

export default SessionsListItem;
