const {describe, it} = global;
import {expect} from 'chai';
import {spy, stub, assert} from 'sinon';
import {shallow, render} from 'enzyme';
import Enroll from '../enroll.jsx';
import React from 'react';

describe(`users.components.enroll`, () => {
  const getProps = () => ({
    username: 'Auser',
    token: 'Atoken',
    handleSubmit: spy(),
  });
  it(`should display the username of the user being enrolled`, () => {
    const props = getProps();
    const el = render(<Enroll {...props}/>);

    expect(el.text()).contains(props.username);
  });
  it(`should have an input for a new password`, () => {
    const props = getProps();
    const el = render(<Enroll {...props}/>);
    const form = el.find('form[name="enroll"]');
    const passwordInput = form.find('input[name="password"]');

    expect(passwordInput).to.have.length(1);
  });
  it(`should have an input for confirmation of new password`, () => {
    const props = getProps();
    const el = render(<Enroll {...props}/>);
    const form = el.find('form[name="enroll"]');
    const confirmInput = form.find('input[name="confirm"]');

    expect(confirmInput).to.have.length(1);
  });
  it(`should call handleSubmit when form submitted`, () => {
    const props = getProps();
    const el = shallow(<Enroll {...props}/>);
    const form = el.find('form[name="enroll"]');
    form.simulate('submit');

    assert.calledOnce(props.handleSubmit);
  });
})
