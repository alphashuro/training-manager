import React from 'react';
import { ListGroupItem } from 'react-bootstrap';
import { Badge } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

const StudentsListItem = ({
  _id, client,
  name, phone, email,
  remove,
  bookingId
}) => (
  <ListGroupItem key={_id}>
    {client ? <Badge>{client.name}</Badge> : null}
    <p>{name}</p>
    <p>{phone}</p>
    <p>{email}</p>
    <Button
      className='remove'
      bsStyle='danger'
      onClick={
        remove.bind(this, bookingId, _id )
      }>
        Remove
      </Button>
  </ListGroupItem>
);

export default StudentsListItem;
