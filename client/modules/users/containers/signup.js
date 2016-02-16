import Signup from '../components/signup.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, clearErrors}, onData) => {
  const {LocalState} = context();
  const error = LocalState.get('SIGNUP_ERROR');
  onData(null, {error});

  // clearErrors when unmounting the component;
  return clearErrors;
};

export const depsMapper = (context, actions) => {
  const props = {};

  props.context = () => context;
  props.signup = actions.auth.signup;
  props.clearErrors = actions.auth.clearSignupErrors;

  return props;
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Signup);
