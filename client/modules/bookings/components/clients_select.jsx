import React, { Component } from 'react';

import { Input } from 'react-bootstrap';

class ClientsSelect extends Component {
  render() {
    const { clients } = this.props;
    return (
      <div>
      <h3>Select a client</h3>
      <Input
        name='clientSelect'
        type='select'
        label='Select Client'
        placeholder='Client'
        onChange={this.clientSelected.bind(this)}>
        {
          clients.map(client => (
            <option key={client._id} value={client._id}>{client.name}</option>
          ))
        }
      </Input>
      </div>
    );
  }

  clientSelected(e) {
    const { select } = this.props;
    select(e.target.value);
  }
}

export default ClientsSelect;
