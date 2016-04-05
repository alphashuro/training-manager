import NewFacilitator from '../components/new_facilitator.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, clearErrors}, onData) => {
  const {LocalState} = context();
  const error = LocalState.get('FACILITATOR_ERROR');
  onData(null, {error});

  // clearErrors when mounting
  return clearErrors;
};

export const depsMapper = (context, actions) => {
  const props = {};

  props.handleCreateFacilitator = e => {
    e.preventDefault();
    const form = e.target;

    const facilitator = {
      email: form.email.value,
      name: form.name.value,
      phone: form.phone.value,
    };

    actions.facilitators.create(facilitator);
  }
  props.clearErrors = actions.facilitators.clearErrors;
  props.context = () => context;

  return props;
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(NewFacilitator);
