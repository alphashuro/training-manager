import FacilitatorsList from '../components/facilitators_list.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  const sub = Meteor.subscribe('facilitators.ids');

  if (sub.ready()) {
    const facilitatorIds = Collections.Users
      .find({ roles: 'facilitator' })
      .fetch()
      .map(f => f._id);
    const error = LocalState.get('FACILITATOR_ERROR');
    onData(null, {facilitatorIds, error});
  }
};

const Container = composeAll(
  composeWithTracker(composer),
  useDeps()
)(FacilitatorsList);

Container.displayName = 'FacilitatorsList';

export default Container;
