import StudentsList from '../components/students_list.jsx';

import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, studentIds, clearErrors}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  const sub = Meteor.subscribe('bookings.students', studentIds);

  if (sub.ready()) {
    const selector = { _id: { $in: studentIds } };
    const students = Collections.Students.find(selector).fetch();
    const error = LocalState.get('BOOKING_STUDENTS_ERROR');
    onData(null, {students, error});
  }

  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  removeStudent: actions.students.removeStudent,
  addStudent: actions.students.addStudent,
  clearErrors: actions.students.clearErrors
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(StudentsList);
