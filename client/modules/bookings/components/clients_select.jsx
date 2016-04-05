import React, { PropTypes } from 'react';

import { Input } from 'react-bootstrap';

const ClientsSelect = ({ clients, handleClientSelected }) => (
  <div>
    <h3>Select a client</h3>
    <Input
      name='client'
      type='select'
      label='Select Client'
      placeholder='Client X...'
      onChange={handleClientSelected}>
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
  handleClientSelected: PropTypes.func.isRequired,
};

export default ClientsSelect;
