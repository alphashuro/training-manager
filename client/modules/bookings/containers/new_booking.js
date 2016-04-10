import NewBooking from '../components/new_booking.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, clearErrors}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  const coursesSub = Meteor.subscribe('courses.list');

  if (coursesSub.ready()) {
    const courses = Collections.Courses.find().fetch();
    const error = LocalState.get('BOOKING_ERROR');
    onData(null, {error, courses});
  }
  // clearErrors when mounting
  return clearErrors;
};

export const depsMapper = (context, actions) => {
  const props = {};

  props.handleCreateBooking = e => {
    e.preventDefault();
    const form = e.target;
    const courseId = form.course.value;
    actions.bookings.create(courseId);
  };
  props.clearErrors = actions.bookings.clearErrors;
  props.context = () => context;

  return props;
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(NewBooking);
