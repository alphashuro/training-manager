import Nav from '../components/navigation.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, FlowRouter} = context();

  const user = Meteor.user();
  const route = FlowRouter.current();

  if (user) {
    onData(null, { email: user.email(), org: user.org(), path: route.path });
  }
  else {
    onData(null, {path: route.path});
  }
};

export const depsMapper = (context, actions) => {
  const props = {};

  props.context = () => context;
  props.handleLogout = actions.auth.logout;

  return props;
};

const Container = composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Nav);

Container.displayName = 'Navigation';

export default Container;
