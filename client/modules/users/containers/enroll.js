import Enroll from '../components/enroll.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const compose = ({context, token}, onData) => {
  const {Meteor, Collections} = context();

  const sub = Meteor.subscribe('users.enrolled', token);
  if (sub.ready()) {
    const user = Collections.Users.findOne();
    onData(null, {user, token});
  }
};

export const depsMapper = (context) => {
  const props = {};
  props.context = () => context;

  return props;
};

export default composeAll(
  composeWithTracker(compose),
  useDeps(depsMapper)
)(Enroll);
