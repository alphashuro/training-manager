import Client from '../components/client.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, clientId, clearErrors}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  const sub = Meteor.subscribe('clients.single', clientId);

  if(sub.ready()) {
    const client = Collections.Clients.findOne(clientId);
    const error = LocalState.get('CLIENT_ERROR');
    onData(null, {client, error});
  }

  return clearErrors;
};

export const depsMapper = (context, actions) => {
  const props = {};

  props.context = () => context;
  props.update = actions.clients.update;
  props.clearErrors = actions.clients.clearErrors;

  return props;
};

const Container = composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Client);

Container.displayName = 'Client';

export default Container;
