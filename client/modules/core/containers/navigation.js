import Nav from '../components/navigation.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, FlowRouter} = context();

  const user = Meteor.user();
  const path = FlowRouter.current().path;

  if (user) {
    onData(null, { user, path });
  }
  else {
    onData(null, {path});
  }
};

export const depsMapper = (context, actions) => {
  const props = {};

  props.context = () => context;
  props.onLogout = actions.auth.logout;

  return props;
};

const Container = composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Nav);

Container.displayName = 'Navigation';

export default Container;
