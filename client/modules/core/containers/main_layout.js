import MainLayout from '../components/main_layout.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, FlowRouter} = context();
  const user = Meteor.user();

  if (user || Meteor.loggingIn()) {
    onData(null, {});
  } else {
    FlowRouter.go('/login');
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(MainLayout);
