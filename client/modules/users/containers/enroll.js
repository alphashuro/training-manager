import Enroll from '../components/enroll.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, token}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  const error = LocalState.get('ENROLL_ERROR');
  const sub = Meteor.subscribe('users.invited', token);
  if (sub.ready()) {
    const { Users } = Collections;
    const user = Users.findOne({'services.password.reset.token': token});
    onData(null, { error, username: user.profile.name, token });
  } else {
    onData(null, { error });
  }
};

export const depsMapper = (context, actions) => {
  const props = {};
  props.context = () => context;
  props.handleSubmit = (token, e) => {
    e.preventDefault();
    const form = e.target;
    actions.users.setPassword(token, form.password.value, form.confirm.value);
  }
  return props;
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Enroll);
