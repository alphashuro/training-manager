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

  props.create = actions.facilitators.create;
  props.clearErrors = actions.facilitators.clearErrors;
  props.context = () => context;

  return props;
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(NewFacilitator);
