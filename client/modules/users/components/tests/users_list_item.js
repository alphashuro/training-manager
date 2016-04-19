import React from 'react';
import {expect} from 'chai';
const {describe, it} = global;
import {spy, stub, assert} from 'sinon';
import {shallow, render} from 'enzyme';
import UsersListItem from '../users_list_item.jsx';

describe(`users.components.users_list_item`, () => {
  const getProps = () => ({
    _id: '1',
    email: 'email@address.com',
    roles: 'role1, role2',
    name: 'name',
    phone: '123',
    handleSendInvite: spy(),
    handleSendResetPasswordEmail: spy(),
    handleRemove: spy()
  });

  it(`should show the user's email`, () => {
    const props = getProps();
    const el = shallow(<UsersListItem {...props}/>);

    expect(el.find({children: props.email})).to.have.length(1);
  });

  it(`should show the user's roles`, () => {
    const props = getProps();
    const el = shallow(<UsersListItem {...props}/>);

    expect(el.find({children: props.roles})).to.have.length(1);
  });
  it(`should show the user's name`, () => {
    const props = getProps();
    const el = shallow(<UsersListItem {...props}/>);

    expect(el.find({children: props.name})).to.have.length(1);
  });
  it(`should show the user's phone if it exists`, () => {
    const props = getProps();
    const el = shallow(<UsersListItem {...props}/>);

    expect(el.find({children: props.phone})).to.have.length(1);
  });
  it(`should call handleSendInvite when send-invite is clicked`, () => {
    const props = getProps();
    const el = shallow(<UsersListItem {...props}/>);

    el.find('.send-invite').simulate('click');

    assert.calledOnce(props.handleSendInvite);
    assert.calledWithExactly(props.handleSendInvite, props._id);
  });
  it(`should call handleSendResetPasswordEmail when send-reset-password-email is clicked`, () => {
    const props = getProps();
    const el = shallow(<UsersListItem {...props}/>);

    el.find('.send-reset-password-email').simulate('click');

    assert.calledOnce(props.handleSendResetPasswordEmail);
    assert.calledWithExactly(props.handleSendResetPasswordEmail, props._id);
  });
  it(`should call handleRemove when remove is clicked`, () => {
    const props = getProps();
    const el = shallow(<UsersListItem {...props}/>);

    el.find('.remove').simulate('click');

    assert.calledOnce(props.handleRemove);
    assert.calledWithExactly(props.handleRemove, props._id);
  });
  it(`should have link to user page`, () => {
    const props = getProps();
    const el = shallow(<UsersListItem {...props}/>);

    expect(el.find({href: `/users/${props._id}`})).to.have.length(1);
  });
});
