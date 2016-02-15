import BookingsList from '../components/bookings_list.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  const sub = Meteor.subscribe('bookings.ids');
  if (sub.ready()) {
    const bookingIds = Collections.Bookings
      .find()
      .fetch()
      .map(b => b._id);
    onData(null, {bookingIds});
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(BookingsList);
