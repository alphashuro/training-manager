import ClientsList from '../components/clients_list.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  const sub = Meteor.subscribe('clients.ids');

  if (sub.ready()) {
    const clientIds = Collections.Clients
      .find()
      .fetch()
      .map(c => c._id);
    const error = LocalState.get('CLIENT_ERROR');
    onData(null, {clientIds, error});
  }
};

const Container = composeAll(
  composeWithTracker(composer),
  useDeps()
)(ClientsList);

Container.displayName = 'ClientsList';

export default Container;
