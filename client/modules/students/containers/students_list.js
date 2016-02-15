import StudentsList from '../components/students_list.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, clientId, clearErrors}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  const sub = Meteor.subscribe('clients.students.ids', clientId);

  if (sub.ready()) {
    const studentIds = Collections.Students
      .find()
      .fetch()
      .map(s => s._id);
    const error = LocalState.get('STUDENTS_ERROR');
    onData(null, {studentIds, error});
  }

  return clearErrors;
};

export const depsMapper = function (context, actions) {
  return {
    context: () => context,
    create: actions.students.create,
    clearErrors: actions.students.clearErrors
  };
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(StudentsList);
