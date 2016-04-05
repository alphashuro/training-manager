import React from 'react';
import {expect} from 'chai';
const {describe, it} = global;
import {spy, stub, assert} from 'sinon';
import {shallow} from 'enzyme';
import Client from '../client.jsx';

describe('clients.components.client', () => {
  const getProps = () => ({
    error: null,
    client: {
      _id: 'id',
      name: 'name',
      phone: 'phone',
      email: 'email',
    },
    handleUpdateClient: spy(),
  });
  describe('if there is error', () => {
    it('should render error', () => {
      const props = getProps();
      props.error = 'oops';

      const el = shallow(<Client {...props}/>);
      expect(el.contains(props.error)).to.be.equal(true);
    });
    it('should render an input with name', () => {
      const props = getProps();

      const el = shallow(<Client {...props}/>);
      const form = el.find('form[name="edit-client"]');

      const nameInput = form.render().find('input[name="name"]');
      expect(nameInput.length).to.be.equal(1);
      expect(nameInput.get(0).attribs.value).to.be.equal(props.client.name);
    });
    it('should render an input with phone', () => {
      const props = getProps();

      const el = shallow(<Client {...props}/>);
      const form = el.find('form[name="edit-client"]');

      const phoneInput = form.render().find('input[name="phone"]');
      expect(phoneInput.length).to.be.equal(1);
      expect(phoneInput.get(0).attribs.value).to.be.equal(props.client.phone);
    });
    it('should render an input with email', () => {
      const props = getProps();

      const el = shallow(<Client {...props}/>);
      const form = el.find('form[name="edit-client"]');

      const emailInput = form.render().find('input[name="email"]');
      expect(emailInput.length).to.be.equal(1);
      expect(emailInput.get(0).attribs.value).to.be.equal(props.client.email);
    });
    it('should call handleUpdateClient when form is submitted', () => {
      const props = getProps();

      const el = shallow(<Client {...props}/>);
      const form = el.find('form[name="edit-client"]');

      form.simulate('submit');

      assert.calledOnce(props.handleUpdateClient);
    });
  });
});
