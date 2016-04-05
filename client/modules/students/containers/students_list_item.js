import StudentsListItem from '../components/students_list_item.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, studentId}, onData) => {
  const {Meteor, Collections} = context();

  const sub = Meteor.subscribe('students.single', studentId);

  if (sub.ready()) {
    const student = Collections.Students.findOne(studentId);
    onData(null, {...student});
  }
};

export const depsMapper = function (context, actions) {
  const props = {};
  props.context = () => context;

  props.handleRemove = (_id) => actions.students.remove(_id);

  props.handleUpdate = (_id, e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const ID = form.ID.value;

    actions.students.update(_id, {name, phone, email, ID});
  };

  return props;
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(StudentsListItem);
