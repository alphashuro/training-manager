import React, { PropTypes } from 'react';

import { Input } from 'react-bootstrap';

const ClientsSelect = ({ clients, handleClientSelected, selectedClient }) => (
  <div>
    <h3>Select a client</h3>
    <Input
      name='client'
      type='select'
      label='Select Client'
      placeholder='Client X...'
      onChange={handleClientSelected}
      defaultValue={selectedClient}>
      <option value="">Select a client</option>
      {
        clients.map(({ _id, name }) => (
          <option key={_id} value={_id}> {name} </option>
        ))
      }
    </Input>
  </div>
);

ClientsSelect.propTypes = {
  clients: PropTypes.array,
  selectedClient: PropTypes.string,
  handleClientSelected: PropTypes.func.isRequired,
};

export default ClientsSelect;
