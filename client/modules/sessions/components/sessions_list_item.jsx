import React from 'react';
import moment from 'moment';

import {ListGroupItem} from 'react-bootstrap';
import DateTimeField from 'react-bootstrap-datetimepicker';

class SessionsListItem extends React.Component {
  render() {
    const { date } = this.props;
    return (
      <ListGroupItem>
        <DateTimeField
          ref='dateRef'
          dateTime={moment(date).format('x')}
          inputFormat='llll'
          daysOfWeekDisabled={[ 0, 6 ]}
          minDate={moment()}
          onChange={this._onDateChanged.bind(this)}
          format="x"
          />
        <p>{moment(date).calendar()}</p>
      </ListGroupItem>
    );
  }

  _onDateChanged(e) {
    const { _id, update} = this.props;
    const date = moment(Number(e)).toDate();
    update(_id, {date});
  }
}

export default SessionsListItem;
