const {describe, it} = global;
import {expect} from 'chai';
import {spy, stub, assert} from 'sinon';
import {shallow, mount, render} from 'enzyme';
import Login from '../login.jsx';
import React from 'react';

describe('users.components.login', () => {
  const getProps = () => ({
    error: null,
    handleLogin: spy()
  });
  it('should show error if there is error', () => {
    const props = getProps();
    props.error = 'oops';
    const el = render(<Login {...props}/>);

    expect(el.text()).to.contain(props.error);
  });

  it('should have an email input', () => {
    const props = getProps();
    const el = render(<Login {...props}/>);

    const emailInput = el.find(`input[id='email']`);

    expect(emailInput).to.have.length(1);
  });
  it('should have a password input', () => {
    const props = getProps();
    const el = render(<Login {...props}/>);

    const passwordInput = el.find('input[id=password]');

    expect(passwordInput).to.have.length(1);
  });
  it('should call login with email and password when .login is clicked', () => {
    const props = getProps();

    const el = mount(<Login {...props} />);

    el.find('input[id=email]').get(0).value = `email`;
    el.find('input[id=password]').get(0).value = `password`;

    el.find('button.login').simulate('click');

    expect(props.login.calledOnce).to.be.equal(true);

    const args = props.login.args[0];

    expect(emailRef.getValue.calledOnce).to.be.equal(true);
    expect(passwordRef.getValue.calledOnce).to.be.equal(true);

    expect(args[0]).to.be.equal('email@address.com');
    expect(args[1]).to.be.equal('password');
  });
});
