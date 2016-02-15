import FacilitatorsList from '../components/facilitators_list.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('facilitators.ids').ready()) {
    const facilitatorIds = Collections.Facilitators
      .find()
      .fetch()
      .map(f => f._id);
    onData(null, {facilitatorIds});
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(FacilitatorsList);
