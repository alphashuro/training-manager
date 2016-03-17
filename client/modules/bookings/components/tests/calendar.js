const {describe, it} = global;
import React from 'react';
import {spy, stub} from 'sinon';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Calendar from '../calendar.jsx';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

describe('bookings.components.calendar', () => {
  const getProps = () => ({
    events: []
  });
  it('should have a link back to bookings list', () => {
    const props = getProps();
    const el = shallow(<Calendar {...props}/>);

    expect(el.find({href: '/bookings'}).length).to.be.equal(1);
  });
  it('should render a BigCalendar', () => {
    const props = getProps();
    const el = shallow(<Calendar {...props}/>);

    const cal = el.find(BigCalendar);

    expect(cal.length).to.be.equal(1);
  });
  describe('the BigCalendar', () => {
    it('should have the events passed to it', () => {
      const props = getProps();
      props.events = [
        { start: new Date() }
      ];
      const el = shallow(<Calendar {...props}/>);

      const cal = el.find(BigCalendar);

      expect(cal.prop('events')).to.deep.equal(props.events);
    });
    it('should have a min time of 8:00', () => {
      const props = getProps();
      const el = shallow(<Calendar {...props}/>);

      const cal = el.find(BigCalendar);
      const min = cal.prop('min');

      expect(min.getHours()).to.be.equal(8);
      expect(min.getMinutes()).to.be.equal(0);
    });
    it('should have a max time of 16:30', () => {
      const props = getProps();
      const el = shallow(<Calendar {...props}/>);

      const cal = el.find(BigCalendar);
      const max = cal.prop('max');

      expect(max.getHours()).to.be.equal(16);
      expect(max.getMinutes()).to.be.equal(30);
    });
  });
});
