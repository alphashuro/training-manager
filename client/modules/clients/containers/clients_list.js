import ClientsList from '../components/clients_list.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('clients.ids').ready()) {
    const clientIds = Collections.Clients
      .find()
      .fetch()
      .map(c => c._id);
    onData(null, {clientIds});
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(ClientsList);
