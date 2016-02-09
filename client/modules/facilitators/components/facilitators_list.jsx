import React from 'react';
import {Table, PageHeader, Button} from 'react-bootstrap';

class FacilitatorsList extends React.Component {
  render() {
    const { facilitators } = this.props;
    return (
      <div>
        <PageHeader>
          Facilitators
          <Button href='/new-facilitator' className='pull-right'>New Facilitator</Button>
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
            facilitators.map( facilitator => (
            <tr key={facilitator._id}>
              <td>
                {facilitator.name}
              </td>
              <td>
                {facilitator.email}
              </td>
              <td>
                {facilitator.phone}
              </td>
              <td>
                <Button href={`/facilitators/${facilitator._id}`}>View</Button>
                <Button onClick={ this.onRemove.bind(this, facilitator._id) }>Delete</Button>
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

export default FacilitatorsList;
