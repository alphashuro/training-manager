import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '../core/containers/main_layout';
import BookingsList from './containers/bookings_list';
import Booking from './containers/booking';
import NewBooking from './containers/new_booking';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/bookings', {
    name: 'bookings.list',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<BookingsList />)
      });
    }
  });

  FlowRouter.route('/bookings/:bookingId', {
    name: 'bookings.single',
    action({bookingId}) {
      mount(MainLayoutCtx, {
        content: () => (<Booking bookingId={bookingId} />)
      });
    }
  });

  FlowRouter.route('/new-booking', {
    name: 'bookings.new',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<NewBooking />)
      });
    }
  });
}
