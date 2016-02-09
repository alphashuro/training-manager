import CoursesList from '../components/courses_list.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('courses.list').ready()) {
    const courses = Collections.Courses.find().fetch();
    onData(null, {courses});
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  remove: actions.courses.remove
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(CoursesList);
