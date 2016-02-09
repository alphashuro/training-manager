import MainLayout from '../components/main_layout.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, FlowRouter} = context();
  if (Meteor.user() || Meteor.loggingIn()) {
    if (Meteor.user()) {
      onData(null, { user: Meteor.user() });
    }
  } else {
    FlowRouter.go('/login');
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(MainLayout);
