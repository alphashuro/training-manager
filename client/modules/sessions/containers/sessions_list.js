import SessionsList from '../components/sessions_list.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, bookingId, clearErrors}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  const sub = Meteor.subscribe('bookings.sessions', bookingId);

  if (sub.ready()) {
    const sessionIds = Collections.Sessions
      .find()
      .fetch()
      .map(s => s._id);
    const error = LocalState.get('SESSIONS_ERROR');
    onData(null, {sessionIds, error});
  }

  return clearErrors;
};

export const depsMapper = (context, actions) => {
  const props = {};

  props.context = () => context;
  props.clearErrors = actions.sessions.clearErrors;

  return props;
};

const Container = composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SessionsList);

Container.displayName = 'SessionsList';

export default Container;
