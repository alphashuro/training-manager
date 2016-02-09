import FacilitatorsList from '../components/facilitators_list.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('facilitators.list').ready()) {
    const facilitators = Collections.Facilitators.find().fetch();
    onData(null, {facilitators});
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  remove: actions.facilitators.remove
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(FacilitatorsList);
