const {describe, it} = global;
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {spy} from 'sinon';
import BookingsListItem from '../bookings_list_item.jsx';
import React from 'react';

describe('bookings.components.bookings_list_item', () => {
  it('should have a link to the booking\'s detail page', () => {
    const props = {
      _id: '1',
      course: {
        title: 'c-1'
      },
      facilitator: {
        name: 'f-1'
      },
      students: [
        {},
        {}
      ],
      onRemove: spy()
    };
    const el = shallow(<BookingsListItem {...props} />);
    const link = el.find(`[href='/bookings/${props._id}']`);
    expect(link.length).to.be.equal(1);
  });
  it('should call remove when .remove is clicked', () => {
    const props = {
      _id: '1',
      course: {
        title: 'c-1'
      },
      facilitator: {
        name: 'f-1'
      },
      students: [
        {},
        {}
      ],
      onRemove: spy()
    };
    const el = shallow(<BookingsListItem {...props} />);
    const deleteButton = el.find('Button.remove');
    deleteButton.simulate('click');
    expect(props.onRemove.calledOnce).to.equal(true);
    expect(props.onRemove.args[0]).to.deep.equal([ props._id ]);
  });
});
