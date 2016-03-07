import NewClient from '../components/new_client.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, clearErrors}, onData) => {
  const {LocalState} = context();
  const error = LocalState.get('CLIENT_ERROR');
  onData(null, {error});

  // clearErrors when mounting
  return clearErrors;
};

export const depsMapper = (context, actions) => {
  const props = {};

  props.create = actions.clients.create;
  props.clearErrors = actions.clients.clearErrors;
  props.context = () => context;

  return props;
};

const Container = composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(NewClient);

Container.displayName = 'NewClient';

export default Container;
