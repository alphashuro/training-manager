import React from 'react';
import {Table, PageHeader, Button} from 'react-bootstrap';
import BookingsListItem from '../containers/bookings_list_item';
import EmptyRow from '../../util/components/EmptyRow.jsx';

export const BookingsList = ({bookingIds}) => (
  <div>
    <PageHeader>
      Bookings
      <Button href='/calendar' className='pull-right'>Calendar</Button>
      <Button href='/new-booking' className='pull-right'>New Booking</Button>
    </PageHeader>
    <Table>
      <thead>
        <tr>
          <th>Course</th>
          <th>Students</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {
        bookingIds.length ? bookingIds.map(
          id => <BookingsListItem key={id} bookingId={id}/>
        ) : <EmptyRow/>
      }
      </tbody>
    </Table>
  </div>
);

export default BookingsList;
