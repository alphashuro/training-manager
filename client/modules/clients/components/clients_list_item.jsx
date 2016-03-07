import React from 'react';
import {Button} from 'react-bootstrap';

const ClientsListItem = ({_id, name, phone, email, onRemove}) => (
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
        className='view'
        href={`/clients/${_id}`}>
        View
      </Button>
      <Button
        className='remove'
        onClick={() => onRemove(_id)}>
        Delete
      </Button>
    </td>
  </tr>
);

export default ClientsListItem;
