import React from 'react';
import moment from 'moment';

import {ListGroupItem} from 'react-bootstrap';
import DateTime from 'react-bootstrap-datetimepicker';

class SessionListItem extends React.Component {
  render() {
    const { date } = this.props;
    return (
      <ListGroupItem>
        <DateTime
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

export default SessionListItem;
