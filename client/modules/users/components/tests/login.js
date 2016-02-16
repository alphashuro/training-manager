const {describe, it} = global;
import {expect} from 'chai';
import {spy, stub} from 'sinon';
import {shallow, mount} from 'enzyme';
import Login from '../login.jsx';
import React from 'react';

describe('users.components.login', () => {
  it('should show error if there is error', () => {
    const props = {
      error: 'oops'
    };

    const el = shallow(<Login {...props}/>);
    const alert = el.find('Alert');
    expect(alert.length).to.be.equal(1);
  });

  it('should have an email input', () => {
    const el = mount(<Login/>);
    const emailRef = el.ref('emailRef');
    expect(emailRef.length).to.be.equal(1);
  });
  it('should have a password input', () => {
    const el = mount(<Login/>);
    const passwordRef = el.ref('passwordRef');
    expect(passwordRef.length).to.be.equal(1);
  });
  it('should call login with email and password when .login is clicked', () => {
    const props = {
      login: spy()
    };

    const el = mount(<Login {...props} />);
    const loginBtn = el.ref('login');
    expect(loginBtn.length).to.be.equal(1);
    const emailRef = el.ref('emailRef').get(0);
    const passwordRef = el.ref('passwordRef').get(0);

    emailRef.getValue = stub();
    emailRef.getValue.returns('email@address.com');

    passwordRef.getValue = stub();
    passwordRef.getValue.returns('password');

    loginBtn.simulate('click');
    expect(props.login.calledOnce).to.be.equal(true);
    const args = props.login.args[0];

    expect(emailRef.getValue.calledOnce).to.be.equal(true);
    expect(passwordRef.getValue.calledOnce).to.be.equal(true);

    expect(args[0]).to.be.equal('email@address.com');
    expect(args[1]).to.be.equal('password');
  });
});
