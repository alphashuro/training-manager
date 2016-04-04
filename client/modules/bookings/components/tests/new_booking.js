const {describe, it} = global;
import React from 'react';
import {spy, assert} from 'sinon';
import {shallow, render} from 'enzyme';
import {expect} from 'chai';
import NewBooking from '../new_booking.jsx';

describe('bookings.components.new_booking', () => {
  const getProps = () => ({
    handleCreateBooking: spy(),
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

    expect(el.contains(props.error)).to.be.equal(true);
  });
  it('should show a select for given courses', () => {
    const props = getProps();
    const el = render(<NewBooking {...props}/>);
    const form = el.find('form[name="new-booking"]')

    const sel = form.find('select[name="course"]');
    expect(sel).to.have.length(1);
    expect(sel.children()).to.have.length(2);
  });
  it('should show a select for given facilitators', () => {
    const props = getProps();
    const el = render(<NewBooking {...props}/>);
    const form = el.find('form[name="new-booking"]')

    const sel = el.find('select[name="facilitator"]');
    expect(sel).to.have.length(1);
    expect(sel.children()).to.have.length(2);
  });
  it('should call handleCreateBooking when form is submitted', () => {
    const props = getProps();
    const el = shallow(<NewBooking {...props}/>);
    const form = el.find('form[name="new-booking"]')

    form.simulate('submit');

    assert.calledOnce(props.handleCreateBooking);
  });
});
