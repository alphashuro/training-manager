import ClassesListItem from '../components/classes_list_item.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, _id}, onData) => {
  const {Meteor, Collections} = context();

  const sub = Meteor.subscribe('classes.single', _id);

  if (sub.ready()) {
    const c = Collections.Classes.findOne(_id);
    onData(null, {...c});
  }
};

export const depsMapper = (context, actions) => {
  const props = {};

  props.context = () => context;
  props.update = actions.classes.update;
  props.remove = actions.classes.remove;

  return props;
};

const Container = composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ClassesListItem);

export default ClassesListItem;
