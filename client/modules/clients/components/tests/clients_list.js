import React from 'react';
import {expect} from 'chai';
const {describe, it} = global;
import {shallow} from 'enzyme';
import ClientsList from '../clients_list.jsx';

describe('clients.components.clients_list', () => {
  it('should render CousesListItem for each id', () => {
    const clientIds = [
      '1', '2', '3'
    ];

    const el = shallow(<ClientsList clientIds={clientIds} />);
    const items = el.find('ClientsListItem');
    expect(items.length).to.be.equal(clientIds.length);
  });
});
