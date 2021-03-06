import StudentsListItem from '../components/students_list_item.jsx';

import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, studentId}, onData) => {
  const {Meteor, Collections} = context();

  const sub = Meteor.subscribe('students.single', studentId);

  if (sub.ready()) {
    const student = Collections.Students.findOne(studentId);
    const client = student.client();
    onData(null, {...student, client});
  }
};

export const depsMapper = (context, actions) => {
  const props = {};

  props.context = () => context;
  props.remove = actions.bookingStudents.remove;

  return props;
};

const Container = composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(StudentsListItem);

Container.displayName = 'StudentsListItem';

export default Container;
