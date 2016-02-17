const {describe, it} = global;
import {expect} from 'chai';
import {spy} from 'sinon';
import {mount} from 'enzyme';
import React from 'react';
import moment from 'moment';
import SessionsListItem from '../sessions_list_item.jsx';

describe('sessions.components.sessions_list_item', () => {
  it('renders a DateTime with the given date', () => {
    const date = new Date();

    const el = mount(<SessionsListItem date={date} />);
    const picker = el.ref('dateRef');
    expect(picker.length).to.be.equal(1);
    expect(picker.prop('dateTime')).to.equal(moment(date).format('x'));
  });
  it('calls update when a new date is selected', () => {
    const props = {
      _id: '123',
      date: new Date(),
      update: spy()
    };
    const newDate = moment().add(1, 'days');
    const newDateTS = newDate.format('x');

    const el = mount(<SessionsListItem {...props} />);
    const picker = el.ref('dateRef');
    picker.prop('onChange')(newDateTS);
    expect(props.update.calledOnce).to.be.equal(true);
    expect(props.update.args[0][0]).to.be.equal(props._id);
    expect(props.update.args[0][1]).to.deep.equal({
      date: newDate.toDate()
    });
  });
});
