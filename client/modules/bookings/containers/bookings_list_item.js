import BookingsListItem from '../components/bookings_list_item.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import LoadingRow from '../components/loading_row.jsx';

export const composer = ({context, bookingId}, onData) => {
  const {Meteor, Collections} = context();

  const sub = Meteor.subscribe('bookings.single', bookingId);

  if (sub.ready()) {
    const booking = Collections.Bookings.findOne(bookingId);
    const course = booking.course();
    const facilitator = booking.facilitator();
    const students = booking.students();

    onData(null, {...booking, course, facilitator, students});
  }
};

export const depsMapper = (context, actions) => {
  const props = {};

  props.context = () => context;
  props.onRemove = actions.bookings.remove;

  return props;
};

const Container = composeAll(
  composeWithTracker(composer, LoadingRow),
  useDeps(depsMapper)
)(BookingsListItem);

Container.displayName = 'BookingsListItem';

export default Container;
