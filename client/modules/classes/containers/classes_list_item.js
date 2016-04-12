import ClassesListItem from '../components/classes_list_item.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import _ from 'underscore';

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

  props.handleRemove = _id => actions.classes.remove(_id);

  props.handleUpdate = (_id, e) => {
    e.preventDefault();
    const form = e.target;
    const values = {
      title: form.title.value,
      description: form.description.value,
      duration: Number(form.duration.value),
      price: Number(form.price.value),
    }
    actions.classes.update(_id, values);
  };

  return props;
};

const Container = composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ClassesListItem);

Container.displayName = 'ClassesListItem';

export default Container;
