import StudentsListItem from '../components/students_list_item.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, studentId, clearErrors}, onData) => {
  const {Meteor, Collections} = context();

  const sub = Meteor.subscribe('students.single', studentId);

  if (sub.ready()) {
    const student = Collections.Students.findOne(studentId);
    onData(null, {...student});
  }

  return clearErrors;
};

export const depsMapper = function (context, actions) {
  return {
    context: () => context,
    remove: actions.students.remove,
    update: actions.students.update
  };
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(StudentsListItem);
