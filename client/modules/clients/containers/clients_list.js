import ClientsList from '../components/clients_list.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('clients.list').ready()) {
    const clients = Collections.Clients.find().fetch();
    onData(null, {clients});
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  remove: actions.clients.remove
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ClientsList);
