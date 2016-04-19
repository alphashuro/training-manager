import NewUser from '../components/new_user.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, clearErrors}, onData) => {
  const {LocalState} = context();
  const error = LocalState.get('USER_ERROR');
  onData(null, {error});

  // clearErrors when mounting
  return clearErrors;
};

export const depsMapper = (context, actions) => {
  const props = {};

  props.handleCreateUser = e => {
    e.preventDefault();
    const form = e.target;

    const user = {
      email: form.email.value,
      name: form.name.value,
      phone: form.phone.value,
    };

    actions.users.create(user);
  }
  props.clearErrors = actions.users.clearErrors;
  props.context = () => context;

  return props;
};

const Container = composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(NewUser);

Container.displayName = "NewUser";

export default Container;
