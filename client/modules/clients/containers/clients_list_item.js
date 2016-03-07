import ClientsListItem from '../components/clients_list_item.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import LoadingRow from '../components/loading_row.jsx';

export const composer = ({context, clientId}, onData) => {
  const {Meteor, Collections} = context();

  const sub = Meteor.subscribe('clients.single', clientId);

  if (sub.ready()) {
    const client = Collections.Clients.findOne(clientId);
    onData(null, {...client});
  }
};

export const depsMapper = (context, actions) => {
  const props = {};

  props.context = () => context;
  props.onRemove = actions.clients.remove;

  return props;
};

const Container = composeAll(
  composeWithTracker(composer, LoadingRow),
  useDeps(depsMapper)
)(ClientsListItem);

Container.displayName = 'ClientsListItem';

export default Container;
