import React from 'react';
import {expect} from 'chai';
const {describe, it} = global;
import {spy} from 'sinon';
import {shallow} from 'enzyme';
import ClientsListItem from '../clients_list_item.jsx';

describe('clients.components.clients_list_item', () => {
  it('should show a name', () => {
    const props = {
      _id: '1',
      name: 'name',
      phone: 'phone',
      email: 'email',
      onRemove: spy()
    };

    const el = shallow(<ClientsListItem {...props}/>);
    const name = el.find({children: props.name});
    expect(name.length).to.be.equal(1);
  });
  it('should show a phone', () => {
    const props = {
      _id: '1',
      name: 'name',
      phone: 'phone',
      email: 'email',
      onRemove: spy()
    };

    const el = shallow(<ClientsListItem {...props}/>);
    const phone = el.find({children: props.phone});
    expect(phone.length).to.be.equal(1);
  });
  it('should call onRemove when .remove is clicked', () => {
    const props = {
      _id: '1',
      name: 'name',
      phone: 'phone',
      email: 'email',
      onRemove: spy()
    };

    const el = shallow(<ClientsListItem {...props}/>);
    const remove = el.find('.remove');
    remove.simulate('click');
    expect(props.onRemove.calledOnce).to.be.equal(true);
  });
});
