const {describe, it} = global;
import React from 'react';
import {spy, stub} from 'sinon';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Booking from '../booking.jsx';

describe('bookings.components.booking', () => {
  const getProps = () => ({
    error: null,
    booking: {
      _id: 'id'
    },
    course: {
      title: 'title'
    }
  });

  it('should show error if there is error', () => {
    const props = getProps();
    props.error = 'oops';

    const el = shallow(<Booking {...props}/>);

    expect(el.find({children: 'oops'}).length).to.be.equal(1);
  });
  it('should show the course title', () => {
    const props = getProps();

    const el = shallow(<Booking {...props}/>);

    expect(el.find({value: props.course.title}).length).to.be.equal(1);
  });
  it('should show a StudentsList component', () => {
    const props = getProps();

    const el = shallow(<Booking {...props}/>);

    expect(el.find('StudentsList').length).to.be.equal(1);
  });
  it('should show a SessionsList component', () => {
    const props = getProps();

    const el = shallow(<Booking {...props}/>);

    expect(el.find('SessionsList').length).to.be.equal(1);
  });
});
