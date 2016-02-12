import ClientsSelect from '../components/clients_select.jsx';

import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  const sub = Meteor.subscribe('clients.list');

  if (sub.ready()) {
    const clients = Collections.Clients.find().fetch();

    onData(null, { clients });
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  select: actions.bookingClients.select
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ClientsSelect);
