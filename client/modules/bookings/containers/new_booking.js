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

export const depsMapper = (context, actions) => {
  const props = {};

  props.handleCreateBooking = e => {
    e.preventDefault();
    const form = e.target;
    const courseId = form.course.value;
    const facilitatorId = form.facilitator.value;
    actions.bookings.create(courseId, facilitatorId);
  };
  props.clearErrors = actions.bookings.clearErrors;
  props.context = () => context;

  return props;
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(NewBooking);
