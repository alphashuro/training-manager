const {describe, it} = global;
import {expect} from 'chai';
import {spy, assert} from 'sinon';
import {shallow} from 'enzyme';
import React from 'react';
import moment from 'moment';
import SessionsListItem from '../sessions_list_item.jsx';

describe('sessions.components.sessions_list_item', () => {
  const getProps = () => ({
    _id: 'id',
    date: new Date(1993, 9, 13),
    handleDateChange: spy(),
  });
  it('renders a DateTime with the given date', () => {
    const props = getProps();

    const el = shallow(<SessionsListItem {...props} />);
    const datePicker = el.find('DateTimeField[name="session-date"]');
    expect(datePicker.length).to.be.equal(1);
    expect(datePicker.prop('dateTime')).to.equal(moment(props.date).format('x'));
  });
  it('calls update when a new date is selected', () => {
    const props = getProps();
    const newDate = moment().add(1, 'days');
    const newDateUnix = newDate.format('x');

    const el = shallow(<SessionsListItem {...props} />);
    const datePicker = el.find('DateTimeField[name="session-date"]');
    datePicker.simulate('change', newDateUnix);
    expect(props.handleDateChange.calledOnce).to.be.equal(true);
    assert.calledWithExactly(props.handleDateChange, props._id, newDateUnix);
  });
});
