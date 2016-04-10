import Dashboard from '../components/dashboard.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
	const {Meteor, Collections} = context();

	const sub = Meteor.subscribe('bookings.coming_up');

	if (sub.ready()) {
    const { Bookings } = Collections;
  	const sessionsComingUp = Bookings.find().fetch();
    const statsThisMonth = [];
  	onData(null, { sessionsComingUp, statsThisMonth });
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Dashboard);
