import Booking from '../components/booking.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, bookingId, clearErrors}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  const sub = Meteor.subscribe('bookings.single', bookingId);

  if (sub.ready()) {
    const {Bookings} = Collections;

    const booking = Bookings.findOne(bookingId);
    const course = booking.course();
    const error = LocalState.get('BOOKING_ERROR');

    const data = {booking, course, error};

    onData(null, data);
  };

  return clearErrors;
};

export const depsMapper = (context, actions) => {
  const props = {};

  props.context = () => context;
  props.update = actions.bookings.update;
  props.clearErrors = actions.bookings.clearErrors;

  return props;
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Booking);
