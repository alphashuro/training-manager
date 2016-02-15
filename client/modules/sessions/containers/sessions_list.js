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

export const depsMapper = (context, actions) => ({
  context: () => context,
  clearErrors: actions.sessions.clearErrors
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SessionsList);
