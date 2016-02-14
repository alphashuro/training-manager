import StudentsList from '../components/students_list.jsx';

import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, clearErrors, bookingId}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  const bookingSub = Meteor.subscribe('bookings.single', bookingId);

  if(bookingSub.ready()) {
    const booking = Collections.Bookings.findOne(bookingId);
    const sub = Meteor.subscribe('bookings.students', booking.studentIds);

    if (sub.ready()) {
      const selector = { _id: { $in: booking.studentIds } };
      const students = Collections.Students.find(selector).fetch();
      const error = LocalState.get('BOOKING_STUDENTS_ERROR');
      onData(null, {students, error});
    }
  }

  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  remove: actions.bookingStudents.remove,
  add: actions.bookingStudents.add,
  clearErrors: actions.bookingStudents.clearErrors,
  showStudentsModal: actions.bookingStudents.showModal
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(StudentsList);
