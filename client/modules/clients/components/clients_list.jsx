import React from 'react';
import {Table, PageHeader, Button} from 'react-bootstrap';
import ClientsListItem from '../containers/clients_list_item';

const ClientsList = ({clientIds}) => (
  <div>
    <PageHeader>
      Clients
      <Button href='/new-client' className='pull-right'>New Client</Button>
    </PageHeader>
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {
        clientIds.map( id => (
          <ClientsListItem
            key={id}
            clientId={id} />
      ))}
      </tbody>
    </Table>
  </div>
);

export default ClientsList;
