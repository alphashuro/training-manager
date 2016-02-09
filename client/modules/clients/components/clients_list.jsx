import React from 'react';
import {Table, PageHeader, Button} from 'react-bootstrap';

class ClientsList extends React.Component {
  render() {
    const { clients } = this.props;
    return (
      <div>
        <PageHeader>
          Clients
          <Button href='/new-client' className='pull-right'>New Client</Button>
        </PageHeader>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {
            clients.map( client => (
            <tr key={client._id}>
              <td>
                {client.name}
              </td>
              <td>
                {client.email}
              </td>
              <td>
                {client.phone}
              </td>
              <td>
                <Button href={`/clients/${client._id}`}>View</Button>
                <Button onClick={ this.onRemove.bind(this, client._id) }>Delete</Button>
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

export default ClientsList;
