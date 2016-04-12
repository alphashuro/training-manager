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
    handleClientSelected: spy()
  });
  describe(`clients select`, () => {
    it(`should have a default first option of 'Select a client'`, () => {
      const props = getProps();
      props.clients = [];
      const el = shallow(<ClientsSelect {...props}/>);

      const option = <option value=''>Select a client</option>;

      expect(el.contains(option)).to.be.equal(true);
      });
    it('should render options of the clients given (+the default option)', () => {
      const props = getProps();
      const el = shallow(<ClientsSelect {...props}/>);

      const sel = el.render().find('select[name="client"]');

      expect(sel).to.have.length(1);
      expect(sel.find('option')).to.have.length(4);
    });
    it(`should call select with the selected client's id
    when a client is selected`, () => {
      const props = getProps();
      const el = shallow(<ClientsSelect {...props}/>);

      el.find('[name="client"]').simulate('change');

      expect(props.handleClientSelected.calledOnce).to.be.equal(true);
    });
    describe('the options', () => {
      it(`should render the client's name, and have _id as value`, () => {
        const props = getProps();
        const el = shallow(<ClientsSelect {...props}/>);
        const {_id, name} = props.clients[0];
        const option = <option value={_id}> {name} </option>;

        expect(el.contains(option)).to.be.equal(true);
      });
    });
  });
});
