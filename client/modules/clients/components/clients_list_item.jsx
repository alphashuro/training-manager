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
      <Button href={`/clients/${_id}`}>View</Button>
      <Button onClick={ onRemove.bind(this, _id) }>Delete</Button>
    </td>
  </tr>
);

export default ClientsListItem;
