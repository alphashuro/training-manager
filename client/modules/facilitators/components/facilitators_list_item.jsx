import React from 'react';
import {Button} from 'react-bootstrap';

const FacilitatorsListItem = ({_id, name, email, phone, onRemove, onInvite}) => (
  <tr>
    <td>
      {name}
    </td>
    <td>
      {email}
    </td>
    <td>
      {phone}
    </td>
    <td>
      <Button
        href={`/facilitators/${_id}`}>
          View
        </Button>
      <Button
        className='invite'
        onClick={ onInvite.bind(this, email) }>
          Invite
        </Button>
      <Button
        className='remove'
        onClick={ onRemove.bind(this, _id) }>
          Delete
        </Button>
    </td>
  </tr>
);

export default FacilitatorsListItem;
