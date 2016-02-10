import MainLayout from '../components/main_layout.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, FlowRouter} = context();
  const user = Meteor.user();
  const path = FlowRouter.current().path;
  if (user || Meteor.loggingIn()) {
    if (user) {
      onData(null, { user, path });
    }
  } else {
    FlowRouter.go('/login');
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  logout: actions.auth.logout
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(MainLayout);
