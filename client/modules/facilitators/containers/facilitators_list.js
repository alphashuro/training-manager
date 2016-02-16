import FacilitatorsList from '../components/facilitators_list.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  const sub = Meteor.subscribe('facilitators.ids');

  if (sub.ready()) {
    const facilitatorIds = Collections.Facilitators
      .find()
      .fetch()
      .map(f => f._id);
    const error = LocalState.get('FACILITATOR_ERROR');
    onData(null, {facilitatorIds, error});
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(FacilitatorsList);
