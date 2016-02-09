import React from 'react';
import {Table, PageHeader, Button} from 'react-bootstrap';

class BookingsList extends React.Component {
  render() {
    const { bookings } = this.props;
    return (
      <div>
        <PageHeader>
          Bookings
          <Button href='/new-booking' className='pull-right'>New Booking</Button>
        </PageHeader>
        <Table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Facilitator</th>
              <th>Students</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {
            bookings.map( booking => (
            <tr key={booking._id}>
              <td>
                {booking.courseId}
              </td>
              <td>
                {booking.facilitatorId}
              </td>
              <td>
                {booking.studentIds.length}
              </td>
              <td>
                <Button href={`/bookings/${booking._id}`}>View</Button>
                <Button onClick={ this.onRemove.bind(this, booking._id) }>Delete</Button>
              </td>
            </tr>
          ))}
          </tbody>
        </Table>
      </div>
    );
  }

  onRemove( _id ) {
    const {remove} = this.props;
    remove(_id);
  }
}

export default BookingsList;
