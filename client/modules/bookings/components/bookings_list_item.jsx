import React from 'react';
import {Button} from 'react-bootstrap';

export const BookingsListItem = ({_id, course, students, onRemove}) => (
  <tr>
    <td>
      {course.title}
    </td>
    <td>
      {students.length}
    </td>
    <td>
      <Button href={`/bookings/${_id}`}>View</Button>
      <Button className='remove' onClick={ onRemove.bind(this, _id) }>Delete</Button>
    </td>
  </tr>
);

export default BookingsListItem;
