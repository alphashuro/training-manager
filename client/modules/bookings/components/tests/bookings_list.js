const {describe, it} = global;
import {expect} from 'chai';
import {shallow} from 'enzyme';
import BookingsList from '../bookings_list.jsx';
import React from 'react';

describe('bookings.components.bookings_list', () => {
  const bookingIds = [
    {
      _id: '1'
    },
    {
      _id: '2'
    },
    {
      _id: '3'
    }
  ];

  it('should list given number of bookingIdss', () => {
    const props = {
      bookingIds
    };

    const el = shallow(<BookingsList {...props} />);
    expect(el.find( 'BookingsListItem' ).length).to.be.equal(bookingIds.length);
  });
});
