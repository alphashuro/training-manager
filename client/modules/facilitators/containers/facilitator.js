import Facilitator from '../components/facilitator.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, facilitatorId, clearErrors}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  const sub = Meteor.subscribe('facilitators.single', facilitatorId);

  if (sub.ready()) {
    const user = Collections.Users.findOne(facilitatorId);
    const error = LocalState.get('FACILITATOR_ERROR');
    const facilitator = {
      _id: user._id,
      email: user.email(),
      name: user.profile.name,
      phone: user.profile.phone,
    };
    onData(null, {facilitator, error});
  }

  return clearErrors;
};

export const depsMapper = (context, actions) => {
  const props = {};

  props.context = () => context;
  props.handleUpdateFacilitator = (id, e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const phone = form.phone.value;

    actions.facilitators.update(id, {name, phone});
  };
  props.clearErrors = actions.facilitators.clearErrors;

  return props;
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Facilitator);
