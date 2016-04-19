import React, { PropTypes } from 'react';
import EmptyRow from '../../util/components/EmptyRow.jsx';
import UsersListItem from '../containers/users_list_item';

import { PageHeader, Button, Table, Alert } from 'react-bootstrap';

const UsersList = ({ error, userIds }) => (
  <div>
    <PageHeader>
      Users
      <Button href='/new-user' className='pull-right'>New User</Button>
    </PageHeader>
    { error ? <Alert bsStyle='danger'>{error}</Alert> : null }
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Roles</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {
        userIds.length ? userIds.map(
          id => <UsersListItem key={id} userId={id} />
        ) : <EmptyRow/>
      }
      </tbody>
    </Table>
  </div>
);

UsersList.propTypes = ({
  error: PropTypes.string,
  userIds: PropTypes.array.isRequired,
});

export default UsersList;
