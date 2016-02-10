import StudentsList from '../components/students_list.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, clientId, clearErrors}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  const studentsSub = Meteor.subscribe('clients.students', clientId);

  if(studentsSub.ready()) {
    const students = Collections.Students.find().fetch();
    const error = LocalState.get('STUDENTS_ERROR');
    onData(null, {students, error});
  }

  return clearErrors
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  removeStudent: actions.students.remove,
  addStudent: actions.students.create,
  saveStudent: actions.students.update,
  clearErrors: actions.students.clearErrors
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(StudentsList);
