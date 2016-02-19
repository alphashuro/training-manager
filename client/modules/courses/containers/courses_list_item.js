import CoursesListItem from '../components/courses_list_item.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import LoadingRow from '../components/loading_row.jsx';

export const composer = ({context, courseId}, onData) => {
  const {Meteor, Collections} = context();

  const sub = Meteor.subscribe('courses.single', courseId);

  if (sub.ready()) {
    const course = Collections.Courses.findOne();
    onData(null, {...course});
  }
};

export const depsMapper = (context, actions) => {
  const props = {};

  props.context = () => context;
  props.onRemove = actions.courses.remove;

  return props;
};

const Container = composeAll(
  composeWithTracker(composer, LoadingRow),
  useDeps(depsMapper)
)(CoursesListItem);

Container.displayName = 'CoursesListItem';

export default Container;
