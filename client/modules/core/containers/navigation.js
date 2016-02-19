import Nav from '../components/navigation.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, FlowRouter} = context();

  const user = Meteor.user();
  const path = FlowRouter.current().path;

  onData(null, { user, path });
};

export const depsMapper = (context, actions) => {
  const props = {};

  props.context = () => context;
  props.onLogout = actions.auth.logout;

  return props;
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Nav);
