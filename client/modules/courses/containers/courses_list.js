import CoursesList from '../components/courses_list.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('courses.ids').ready()) {
    const courseIds = Collections.Courses
      .find()
      .fetch()
      .map(c => c._id);
    onData(null, {courseIds});
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(CoursesList);
