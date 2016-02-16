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

export const depsMapper = (context, actions) => {
  const props = {};

  props.context = () => context;
  props.onRemove = actions.facilitators.remove;
  props.onInvite = actions.facilitators.invite;

  return props;
};


export default composeAll(
  composeWithTracker(composer, Loading),
  useDeps(depsMapper)
)(FacilitatorsListItem);
