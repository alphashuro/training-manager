const {describe, it} = global;
import {expect} from 'chai';
import {spy, stub, assert} from 'sinon';
import {shallow, render} from 'enzyme';
import Login from '../login.jsx';
import React from 'react';

describe('users.components.login', () => {
  const getProps = () => ({
    error: null,
    handleLogin: spy(),
  });
  it('should show error if there is error', () => {
    const props = getProps();
    props.error = 'oops';
    const el = render(<Login {...props}/>);

    expect(el.text()).to.contain(props.error);
  });

  it('form should have an email input', () => {
    const props = getProps();
    const el = render(<Login {...props}/>);
    const form = el.find('form[name="login"]');

    const emailInput = form.find(`input[name=email]`);

    expect(emailInput).to.have.length(1);
  });
  it('form should have a password input', () => {
    const props = getProps();
    const el = render(<Login {...props}/>);
    const form = el.find('form[name="login"]');

    const passwordInput = form.find('input[name=password]');

    expect(passwordInput).to.have.length(1);
  });
  it('should call handleLogin when form is submitted', () => {
    const props = getProps();

    const el = shallow(<Login {...props} />);

    el.find('form[name="login"]').simulate('submit');

    expect(props.handleLogin.calledOnce).to.be.equal(true);
  });
});
