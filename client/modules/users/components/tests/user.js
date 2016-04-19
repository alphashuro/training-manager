const {describe, it} = global;
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {spy, assert} from 'sinon';
import React from 'react';
import User from '../user.jsx';

describe('users.components.user', () => {
  const getProps = () => ({
    error: null,
    user: {
      email: 'email@address.com',
      name: 'name',
      phone: 'phone',
      roles: [ 'admin', 'facilitator' ]
    },
    handleUpdateUser: spy(),
  });
  describe('if there is error', () => {
    it('should render given error', () => {
      const props = getProps();
      props.error = 'oops';

      const el = shallow(<User {...props} />);

      expect(el.contains(props.error)).to.be.equal(true);
    });
  });
  it('should render the email in an input', () => {
    const props = getProps();

    const el = shallow(<User {...props} />);
    const form = el.find('form[name="edit-user"]')

    const emailInput = form.render().find('input[name="email"]')
    expect(emailInput.length).to.be.equal(1);
    expect(emailInput.get(0).attribs.value).to.be.equal(props.user.email);
  });
  it('should render the name in an input', () => {
    const props = getProps();

    const el = shallow(<User {...props} />);
    const form = el.find('form[name="edit-user"]')

    const nameInput = form.render().find('input[name="name"]')
    expect(nameInput.length).to.be.equal(1);
    expect(nameInput.get(0).attribs.value).to.be.equal(props.user.name);
  });
  it('should render the phone in an input', () => {
    const props = getProps();

    const el = shallow(<User {...props}/>);
    const form = el.find('form[name="edit-user"]')

    const phoneInput = form.render().find('input[name="phone"]')
    expect(phoneInput.length).to.be.equal(1);
    expect(phoneInput.get(0).attribs.value).to.be.equal(props.user.phone);
  });
  it('should call handleUpdateUser when form is submitted', () => {
    const props = getProps();

    const el = shallow(<User {...props}/>);
    const form = el.find('form[name="edit-user"]')

    form.simulate('submit');

    assert.calledOnce(props.handleUpdateUser);
  });
});
