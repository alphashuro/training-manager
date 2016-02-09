import Booking from '../components/booking.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, bookingId, clearErrors}, onData) => {
  const {Meteor, Collections, Tracker, LocalState} = context();

  Meteor.subscribe('bookings.single', bookingId, () => {
    const booking = Collections.Bookings.findOne(bookingId);
    const error = LocalState.get('BOOKING_ERROR');
    onData(null, {booking, error});
  });

  // support latency compensation
  const bookingFromCache = Tracker.nonreactive(() => {
    return Collections.Bookings.findOne(bookingId);
  });

  if (bookingFromCache) {
    onData(null, {booking: bookingFromCache});
  } else {
    onData();
  }

  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  update: actions.bookings.update,
  clearErrors: actions.bookings.clearErrors
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Booking);
