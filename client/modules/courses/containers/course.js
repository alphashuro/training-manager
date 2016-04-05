import Course from '../components/course.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, courseId, clearErrors}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  const sub = Meteor.subscribe('courses.single', courseId);

  if(sub.ready()) {
    const {Courses} = Collections;
    const course = Courses.findOne(courseId);
    const error = LocalState.get('COURSE_ERROR');
    onData(null, {course, error});
  };

  return clearErrors;
};

export const depsMapper = (context, actions) => {
  const props = {};

  props.context = () => context;
  props.handleUpdate = (_id, e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    actions.courses.update(_id, {title, description});
  };
  props.clearErrors = actions.courses.clearErrors;

  return props;
};

const Container = composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Course);

Container.displayName = 'Course';

export default Container;
