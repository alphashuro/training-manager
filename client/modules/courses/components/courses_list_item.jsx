import React from 'react';
import {Button} from 'react-bootstrap';

const CoursesListItem = ({_id, title, description, onRemove}) => (
  <tr key={_id}>
    <td>
      {title}
    </td>
    <td>
      {description}
    </td>
    <td>
      <Button className='view' href={`/courses/${_id}`}>View</Button>
      <Button className='remove' onClick={ onRemove.bind(this, _id) }>Delete</Button>
    </td>
  </tr>
);

export default CoursesListItem;
