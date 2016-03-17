const {describe, it} = global;
import React from 'react';
import {spy, assert} from 'sinon';
import {shallow, render, mount} from 'enzyme';
import {expect} from 'chai';
import NewBooking from '../new_booking.jsx';

describe('bookings.components.new_booking', () => {
  const getProps = () => ({
    create: spy(),
    error: null,
    facilitators: [
      {_id: '1', name: 'f1'},
      {_id: '2', name: 'f2'}
    ],
    courses: [
      {_id: '1', name: 'c1'},
      {_id: '2', name: 'c2'}
    ]
  });
  it(`should show the text 'New Booking'`, () => {
    const props = getProps();
    const el = render(<NewBooking {...props}/>);

    expect(el.text()).to.match(/new booking/i);
  });
  it('should show an error if there is an error', () => {
    const props = getProps();
    props.error = 'oops';
    const el = shallow(<NewBooking {...props}/>);

    expect(el.find({children: props.error})).to.have.length(1);
  });
  it('should show a select for given courses', () => {
    const props = getProps();
    const el = shallow(<NewBooking {...props}/>);

    const sel = el.find('[name="courseSelect"]');
    expect(sel).to.have.length(1);
    expect(sel.children()).to.have.length(2);
  });
  it('should show a select for given facilitators', () => {
    const props = getProps();
    const el = shallow(<NewBooking {...props}/>);

    const sel = el.find('[name="facilitatorSelect"]');
    expect(sel).to.have.length(1);
    expect(sel.children()).to.have.length(2);
  });
  it('should call create with courseId and facilitatorId when .save button is clicked', () => {
    const props = getProps();
    const el = mount(<NewBooking {...props}/>);

    const csel = el.find('[name="courseSelect"]');
    const ssel = el.find('[name="facilitatorSelect"]');
    csel.get(0).value = '2';
    ssel.get(0).value = '2';
    el.find('.save').simulate('click');

    assert.calledWith(props.create, '2', '2');
  });
});
