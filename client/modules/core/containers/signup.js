import Signup from '../components/signup.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, clearErrors}, onData) => {
  const {LocalState} = context();
  const error = LocalState.get('SIGNUP_ERROR');
  onData(null, {error});

  // clearErrors when unmounting the component;
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  signup: actions.auth.signup,
  context: () => context,
  clearErrors: actions.auth.clearSignupErrors
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Signup);
