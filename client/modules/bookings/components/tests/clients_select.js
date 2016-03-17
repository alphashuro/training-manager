const {describe, it} = global;
import React from 'react';
import {spy, stub} from 'sinon';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import ClientsSelect from '../clients_select.jsx';

describe('bookings.components.clients_select', () => {
  const getProps = () => ({
    clients: [
      {_id: 'id1', name: 'name1'},
      {_id: 'id2', name: 'name2'},
      {_id: 'id3', name: 'name3'}
    ],
    select: spy()
  });
  it('should render a select with options of the clients given', () => {
    const props = getProps();
    const el = shallow(<ClientsSelect {...props}/>);

    const sel = el.find('[name="clientSelect"]');

    expect(sel).to.have.length(1);
    expect(sel.find('option')).to.have.length(3);
  });
  describe('the options', () => {
    it(`should render the client's name,
      and have _id as value`, () => {
      const props = getProps();
      const el = shallow(<ClientsSelect {...props}/>);
      const client1 = props.clients[0];
      const option = <option
        value={client1._id}>
          {client1.name}
        </option>;

      expect(el.contains(option)).to.be.equal(true);
    });
  });
  it(`should call select with the selected client's id
    when a client is selected`, () => {
    const props = getProps();
    const el = shallow(<ClientsSelect {...props}/>);

    el.find('[name="clientSelect"]').simulate('change', {
      target: {
        value: props.clients[1]._id
      }
    });

    expect(props.select.calledOnce).to.be.equal(true);
    expect(props.select.args[0][0]).to.deep.equal(props.clients[1]._id)
  });
});
