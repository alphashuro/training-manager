const {describe, it} = global;
import {expect} from 'chai';
import {shallow, render} from 'enzyme';
import {spy, stub, assert} from 'sinon';
import Signup from '../signup.jsx';
import React from 'react';

describe('users.components.signup', () => {
  const getProps = () => ({
    error: null,
    handleSignup: spy(),
  });
  it('should show an error if there is error', () => {
    const props = getProps();
    props.error = 'oops';
    const el = render(<Signup {...props}/>);

    expect(el.text()).to.contain(props.error);
  });
  it('form should have an email input', () => {
    const props = getProps();
    const el = render(<Signup {...props}/>);
    const form = el.find('form[name="signup"]');

    expect(form.find('input[name="email"]')).to.have.length(1);
  });
  it('form should have a password input', () => {
    const props = getProps();
    const el = render(<Signup {...props}/>);
    const form = el.find('form[name="signup"]');

    expect(form.find('input[name="password"]')).to.have.length(1);
  });
  it('should call handleSignup when form is submitted', () => {
    const props = getProps();
    const el = shallow(<Signup {...props}/>);
    const form = el.find('form[name="signup"]');

    form.simulate('submit');
    assert.calledOnce(props.handleSignup);
  });
});
