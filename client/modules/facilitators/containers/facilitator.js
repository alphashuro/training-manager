import Facilitator from '../components/facilitator.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, facilitatorId, clearErrors}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  const sub = Meteor.subscribe('facilitators.single', facilitatorId);

  if (sub.ready()) {
    const facilitator = Collections.Users.findOne(facilitatorId);
    const error = LocalState.get('FACILITATOR_ERROR');
    onData(null, {facilitator, error});
  }

  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  update: actions.facilitators.update,
  clearErrors: actions.facilitators.clearErrors
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Facilitator);
