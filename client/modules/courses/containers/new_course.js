import NewCourse from '../components/new_course.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, clearErrors}, onData) => {
  const {LocalState} = context();
  const error = LocalState.get('COURSE_ERROR');
  onData(null, {error});

  // clearErrors when mounting
  return clearErrors;
};

export const depsMapper = (context, actions) => {
  const props = {};

  props.create = actions.courses.create;
  props.clearErrors = actions.courses.clearErrors;
  props.context = () => context;

  return props;
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(NewCourse);
