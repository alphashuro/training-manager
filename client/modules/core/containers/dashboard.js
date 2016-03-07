import Dashboard from '../components/dashboard.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  	const {Meteor, Collections} = context();

  	const sub = Meteor.subscribe('bookings.list');

  	if (sub.ready()) {
    	const bookings = Collections.Bookings.find().fetch();
    	onData(null, {bookings});
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Dashboard);
