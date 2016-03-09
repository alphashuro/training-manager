import StudentsSelect from '../components/students_select.jsx';

import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, bookingId, clearErrors}, onData) => {
  const {Meteor, Collections, LocalState} = context();
  const clientId = LocalState.get('SELECTED_CLIENT');
  const error = LocalState.get('BOOKING_STUDENTS_ERROR');

  if (clientId) {
    const sub = Meteor.subscribe('clients.students', clientId);
    const bookingSub = Meteor.subscribe('bookings.single', bookingId);

    if (sub.ready() && bookingSub.ready()) {
      const students = Collections.Students.find({clientId}).fetch();
      const booking = Collections.Bookings.findOne(bookingId);
      const bookingStudents = booking.studentIds;
      onData(null, {students, bookingStudents, error});
    }
  } else {
    const students = [];
    onData(null, {students, error});
  }
};

export const depsMapper = (context, actions) => {
  const props = {};

  props.context = () => context;
  props.add = actions.bookingStudents.add;
  props.remove = actions.bookingStudents.remove;
  props.clearErrors = actions.bookingStudents.clearErrors;

  return props;
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(StudentsSelect);
