import Facilitator from '../components/facilitator.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, facilitatorId, clearErrors}, onData) => {
  const {Meteor, Collections, Tracker, LocalState} = context();

  Meteor.subscribe('facilitators.single', facilitatorId, () => {
    const facilitator = Collections.Facilitators.findOne(facilitatorId);
    const error = LocalState.get('FACILITATOR_ERROR');
    onData(null, {facilitator, error});
  });

  // support latency compensation
  const facilitatorFromCache = Tracker.nonreactive(() => {
    return Collections.Facilitators.findOne(facilitatorId);
  });

  if (facilitatorFromCache) {
    onData(null, {facilitator: facilitatorFromCache});
  } else {
    onData();
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
