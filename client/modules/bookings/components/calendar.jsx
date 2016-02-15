import React from 'react';

import {Grid, Row, Button} from 'react-bootstrap';

import BigCalendar from 'react-big-calendar';
import moment from 'moment';

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

const Calendar = ({events}) => (
  <Grid>
    <Row>
      <Button href='/bookings'>Back to Bookings</Button>
    </Row>
    <Row>
      <BigCalendar
        events={events}
        defaultView='week'
        views={[ 'week', 'day' ]}
        popup
        min={moment('8:00','HH:mm').toDate()}
        max={moment('16:30','HH:mm').toDate()}
      />
    </Row>
  </Grid>
);

export default Calendar;
