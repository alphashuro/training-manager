const {describe, it} = global;
import React from 'react';
import {spy, assert} from 'sinon';
import {shallow, render} from 'enzyme';
import {expect} from 'chai';
import StudentsListItem from '../students_list_item.jsx';

describe('bookings.components.students_list_item', () => {
  const getProps = () => ({
    _id: '1',
    client: {
      name: 'client1'
    },
    name: 'name',
    phone: 'phone',
    email: 'email',
    remove: spy(),
    bookingId: '1'
  });
  it(`should render the client's name`, () => {
    const props = getProps();
    const el = shallow(<StudentsListItem {...props}/>);

    expect(el.find({children: props.client.name})).to.have.length(1);
  });
  it(`should render the student's name`, () => {
    const props = getProps();
    const el = shallow(<StudentsListItem {...props}/>);

    expect(el.find({children: props.name})).to.have.length(1);
  });
  it(`should render the student's phone`, () => {
    const props = getProps();
    const el = shallow(<StudentsListItem {...props}/>);

    expect(el.find({children: props.phone})).to.have.length(1);
  });
  it(`should render the student's email`, () => {
    const props = getProps();
    const el = shallow(<StudentsListItem {...props}/>);

    expect(el.find({children: props.email})).to.have.length(1);
  });
  it(`should call remove
    with the bookingId, and _id
    when .remove is clicked`, () => {
    const props = getProps();
    const el = shallow(<StudentsListItem {...props}/>);

    el.find('.remove').simulate('click');

    assert.calledWith(props.remove, props.bookingId, props._id);
  });
});
