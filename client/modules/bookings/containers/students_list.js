import StudentsList from '../components/students_list.jsx';

import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, clearErrors, bookingId}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  const sub = Meteor.subscribe('bookings.students.ids', bookingId);

  if (sub.ready()) {
    const booking = Collections.Bookings.findOne(bookingId);
    const studentIds = booking.students().map(s => s._id);
    const error = LocalState.get('BOOKING_STUDENTS_ERROR');
    onData(null, {studentIds, error});
  }

  return clearErrors;
};

export const depsMapper = (context, actions) => {
  const props = {};

  props.context = () => context;
  props.add = actions.bookingStudents.add;
  props.clearErrors = actions.bookingStudents.clearErrors;
  props.showStudentsModal = actions.bookingStudents.showModal;

  return props;
};

const Container = composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(StudentsList);

Container.displayName = 'StudentsList';

export default Container;
