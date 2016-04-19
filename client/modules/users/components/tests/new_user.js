const {describe, it} = global;
import {expect} from 'chai';
import {spy, assert} from 'sinon';
import {shallow} from 'enzyme';
import React from 'react';
import NewUser from '../new_user.jsx';

describe('users.components.new_user', () => {
  const getProps = () => ({
    error: null,
    handleCreateUser: spy(),
  });
  describe('if there is error', () => {
    it('should render error', () => {
      const props = getProps();
      props.error = 'oops';

      const el = shallow(<NewUser {...props}/>);
      expect(el.contains(props.error)).to.be.equal(true);
    });
  });
  it('should have an input for name', () => {
    const props = getProps();

    const el = shallow(<NewUser {...props}/>);
    const form = el.find('form[name="new-user"]')

    const nameInput = form.render().find('input[name="name"]');
    expect(nameInput.length).to.be.equal(1);
  });
  it('should have an input for phone', () => {
    const props = getProps();

    const el = shallow(<NewUser {...props}/>);
    const form = el.find('form[name="new-user"]')

    const phoneInput = form.render().find('input[name="phone"]');
    expect(phoneInput.length).to.be.equal(1);
  });
  it('should have an input for email', () => {
    const props = getProps();

    const el = shallow(<NewUser {...props}/>);
    const form = el.find('form[name="new-user"]')

    const emailInput = form.render().find('input[name="email"]');
    expect(emailInput.length).to.be.equal(1);
  });
  it('should call handleCreateUser when form is submitted', () => {
    const props = getProps();

    const el = shallow(<NewUser {...props}/>);
    const form = el.find('form[name="new-user"]')

    form.simulate('submit');

    assert.calledOnce(props.handleCreateUser);
  });
});
