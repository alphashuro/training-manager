import ClassesList from '../components/classes_list.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, courseId, clearErrors}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  const sub = Meteor.subscribe('classes.ids', courseId);

  if (sub.ready()) {
    const classesIds = Collections.Classes.find()
    .fetch()
    .map(c => c._id);
    const error = LocalState.get('CLASSES_ERROR');
    onData(null, {classesIds, error});
  }

  return clearErrors;
};

export const depsMapper = (context, actions) => {
  const props = {};

  props.context = () => context;
  props.handleAddClass = actions.classes.create;
  props.clearErrors = actions.classes.clearErrors;

  return props;
};

const Container = composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ClassesList);

Container.className = "ClassesList";

export default Container;
