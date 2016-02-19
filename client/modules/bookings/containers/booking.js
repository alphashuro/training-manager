import Booking from '../components/booking.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, bookingId, clearErrors}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  Meteor.subscribe('bookings.single', bookingId, () => {

    const booking = Collections.Bookings.findOne(bookingId);
    const course = Collections.Courses.findOne(booking.courseId);
    const facilitator = Collections.Facilitators.findOne(booking.facilitatorId);
    const error = LocalState.get('BOOKING_ERROR');

    onData(null, {booking, course, facilitator, error});
  });

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
