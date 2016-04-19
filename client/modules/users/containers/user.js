import User from '../components/user.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, userId, clearErrors}, onData) => {
  const {Meteor, Collections, LocalState} = context();
  const {Users} = Collections;

  const sub = Meteor.subscribe('users.single', userId);

  if (sub.ready()) {
    const doc = Users.findOne(userId);
    const error = LocalState.get('USER_ERROR');
    const user = {
      _id: doc._id,
      email: doc.email(),
      name: doc.name(),
      phone: doc.phone(),
      roles: doc.roles,
    };
    onData(null, {user, error});
  }

  return clearErrors;
};

export const depsMapper = (context, actions) => {
  const props = {};

  props.context = () => context;
  props.handleUpdateUser = (id, e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const phone = form.phone.value;
    const roles = [];
    if (form.isAdmin.checked) roles.push('admin');
    if (form.isFacilitator.checked) roles.push('facilitator');

    actions.users.update(id, {name, phone, roles});
  };
  props.clearErrors = actions.users.clearErrors;

  return props;
};

const Container = composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(User);

Container.displayName = 'User';

export default Container;
