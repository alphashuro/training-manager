const {describe, it} = global;
import {expect} from 'chai';
import {shallow, render} from 'enzyme';
import {spy, stub, assert} from 'sinon';
import UsersList from '../users_list.jsx';
import React from 'react';

describe(`users.components.users_list`, () => {
  const getProps = () => ({
    error: null,
    userIds: ['1', '2']
  });

  it(`should render UsersListItem for each user id`, () => {
    const props = getProps();
    const el = shallow(<UsersList {...props}/>);

    const items = el.find('UsersListItem');
    expect(items.length).to.be.equal(props.userIds.length);
  });

  it(`should render error when there is error`, () => {
    const props = getProps();
    props.error = 'oops';
    const el = shallow(<UsersList {...props}/>);

    expect(el.find({children: props.error})).to.have.length(1);
  });
});
