import StudentsListItem from '../components/students_list_item.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, studentId}, onData) => {
  const {Meteor, Collections} = context();

  const sub = Meteor.subscribe('students.single', studentId);

  if (sub.ready()) {
    const student = Collections.Students.findOne(studentId);
    onData(null, {...student});
  }
};

export const depsMapper = function (context, actions) {
  const props = {};
  props.context = () => context;
  props.remove = actions.students.remove;
  props.update = actions.students.update;
  return props;
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(StudentsListItem);
