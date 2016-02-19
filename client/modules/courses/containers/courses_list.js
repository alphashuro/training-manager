import CoursesList from '../components/courses_list.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  const sub = Meteor.subscribe('courses.ids');

  if (sub.ready()) {
    const courseIds = Collections.Courses
      .find()
      .fetch()
      .map(c => c._id);
    const error = LocalState.get('COURSE_ERROR');
    onData(null, {courseIds, error});
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(CoursesList);
