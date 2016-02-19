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

export const depsMapper = (context, actions) => ({
  context: () => context,
  update: actions.courses.update,
  clearErrors: actions.courses.clearErrors
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Course);
