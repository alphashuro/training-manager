import NewBooking from '../components/new_booking.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, clearErrors}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  const coursesSub = Meteor.subscribe('courses.list');
  const facilitatorsSub = Meteor.subscribe('facilitators.list');

  if (coursesSub.ready() && facilitatorsSub.ready()) {
    const courses = Collections.Courses.find().fetch();
    const facilitators = Collections.Facilitators.find().fetch();
    const error = LocalState.get('BOOKING_ERROR');
    onData(null, {error, courses, facilitators});
  }
  // clearErrors when mounting
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  create: actions.bookings.create,
  clearErrors: actions.bookings.clearErrors,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(NewBooking);
