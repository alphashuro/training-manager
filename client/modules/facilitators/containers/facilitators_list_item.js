import FacilitatorsListItem from '../components/facilitators_list_item.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import Loading from '../components/loading_row.jsx';

export const composer = ({context, facilitatorId}, onData) => {
  const {Meteor, Collections} = context();

  const sub = Meteor.subscribe('facilitators.single', facilitatorId);

  if (sub.ready()) {
    const facilitator = Collections.Facilitators.findOne(facilitatorId);
    onData(null, {...facilitator});
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  onRemove: actions.facilitators.remove,
  onInvite: actions.users.invite
});


export default composeAll(
  composeWithTracker(composer, Loading),
  useDeps(depsMapper)
)(FacilitatorsListItem);
