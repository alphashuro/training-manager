const {describe, it} = global;
import {expect} from 'chai';
import {shallow, mount} from 'enzyme';
import {spy, stub} from 'sinon';
import Signup from '../signup.jsx';
import React from 'react';

describe('users.components.signup', () => {
  it('should show an error if there is error', () => {
    const props = {
      error: 'oops'
    };

    const el = shallow(<Signup {...props}/>);
    expect(el.find('Alert').length).to.be.equal(1);
  });
  it('should have an email input', () => {
    const el = mount(<Signup/>);
    const emailRef = el.ref('emailRef');
    expect(emailRef.length).to.be.equal(1);
  });
  it('should have a password input', () => {
    const el = mount(<Signup/>);
    const passwordRef = el.ref('passwordRef');
    expect(passwordRef.length).to.be.equal(1);
  });
  it('should have an organization input', () => {
    const el = mount(<Signup/>);
    const orgRef = el.ref('orgRef');
    expect(orgRef.length).to.be.equal(1);
  });
  it('should call signup with email, password and org when signupRef is clicked', () => {
    const props = {
      signup: spy()
    };

    const el = mount(<Signup {...props} />);
    const signupBtn = el.ref('signup');
    expect(signupBtn.length).to.be.equal(1);

    const emailRef = el.ref('emailRef').get(0);
    const passwordRef = el.ref('passwordRef').get(0);
    const orgRef = el.ref('orgRef').get(0);

    emailRef.getValue = stub();
    emailRef.getValue.returns('email@address.com');

    passwordRef.getValue = stub();
    passwordRef.getValue.returns('password');

    orgRef.getValue = stub();
    orgRef.getValue.returns('org');

    signupBtn.simulate('click');
    expect(props.signup.calledOnce).to.be.equal(true);
    const args = props.signup.args[0];

    expect(emailRef.getValue.calledOnce).to.be.equal(true);
    expect(passwordRef.getValue.calledOnce).to.be.equal(true);
    expect(orgRef.getValue.calledOnce).to.be.equal(true);

    expect(args[0]).to.be.equal('email@address.com');
    expect(args[1]).to.be.equal('password');
    expect(args[2]).to.be.equal('org');
  });
});
