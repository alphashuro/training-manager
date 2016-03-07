import Course from '../components/course.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, courseId, clearErrors}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  Meteor.subscribe('courses.single', courseId, () => {
    const course = Collections.Courses.findOne(courseId);
    const error = LocalState.get('COURSE_ERROR');
    onData(null, {course, error});
  });

  return clearErrors;
};

export const depsMapper = (context, actions) => {
  const props = {};

  props.context = () => context;
  props.update = actions.courses.update;
  props.clearErrors = actions.courses.clearErrors;

  return props;
};

const Container = composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Course);

Container.displayName = 'Course';

export default Container;
