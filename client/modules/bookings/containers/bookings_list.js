import BookingsList from '../components/bookings_list.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('bookings.list').ready()) {
    const bookings = Collections.Bookings.find().fetch();
    onData(null, {bookings});
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  remove: actions.bookings.remove
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(BookingsList);
