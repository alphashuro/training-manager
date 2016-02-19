import ClassesList from '../components/classes_list.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, courseId, clearErrors}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  const classesSub = Meteor.subscribe('courses.classes', courseId);

  if (classesSub.ready()) {
    const classes = Collections.Classes.find().fetch();
    const error = LocalState.get('CLASSES_ERROR');
    onData(null, {classes, error});
  }

  return clearErrors;
};

export const depsMapper = (context, actions) => {
  const props = {};

  props.context = () => context;
  props.removeClass = actions.classes.remove;
  props.addClass = actions.classes.create;
  props.saveClass = actions.classes.update;
  props.clearErrors = actions.classes.clearErrors;

  return props;
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ClassesList);
