import Client from '../components/client.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, clientId, clearErrors}, onData) => {
  const {Meteor, Collections, Tracker, LocalState} = context();

  Meteor.subscribe('clients.single', clientId, () => {
    const client = Collections.Clients.findOne(clientId);
    const error = LocalState.get('CLIENT_ERROR');
    onData(null, {client, error});
  });

  // support latency compensation
  const clientFromCache = Tracker.nonreactive(() => {
    return Collections.Clients.findOne(clientId);
  });

  if (clientFromCache) {
    onData(null, {client: clientFromCache});
  } else {
    onData();
  }

  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  update: actions.clients.update,
  clearErrors: actions.clients.clearErrors
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Client);
