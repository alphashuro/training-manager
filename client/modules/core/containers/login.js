import Login from '../components/login.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, clearErrors}, onData) => {
  const {LocalState} = context();
  const error = LocalState.get('LOGIN_ERROR');
  onData(null, {error});

  // clearErrors when unmounting the component;
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  login: actions.auth.login,
  context: () => context,
  clearErrors: actions.auth.clearLoginErrors
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Login);
