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
  const map = {};
  map.context = () => context;
  map.create = actions.students.create;
  map.clearErrors = actions.students.clearErrors;
  return map;
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(StudentsList);
