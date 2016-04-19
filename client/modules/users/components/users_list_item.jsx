import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';

const UsersListItem = ({ _id, email, roles, name, phone, handleSendInvite, handleRemove, handleSendResetPasswordEmail }) => (
  <tr>
    <td>
      {name}
    </td>
    <td>
    {phone}
    </td>
    <td>
      {email}
    </td>
    <td>
      {roles}
    </td>
    <td>
      <Button
        className='view'
        href={`/users/${_id}`}>
        View
      </Button>
      <Button
        className='send-invite'
        onClick={handleSendInvite.bind(null, _id)}>
        Send Invite
      </Button>
      <Button
        className='send-reset-password-email'
        onClick={handleSendResetPasswordEmail.bind(null, _id)}>
        Reset Password
      </Button>
      <Button
        className='remove'
        onClick={handleRemove.bind(null, _id)}>
        Delete
      </Button>
    </td>
  </tr>
);

UsersListItem.propTypes = ({
  _id: PropTypes.string,
  email: PropTypes.string.isRequired,
  roles: PropTypes.string.isRequired,
  name: PropTypes.string,
  phone: PropTypes.string,
  handleSendInvite: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleSendResetPasswordEmail: PropTypes.func.isRequired,
});

export default UsersListItem;
