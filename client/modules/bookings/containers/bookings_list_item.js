import BookingsListItem from '../components/bookings_list_item.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import LoadingRow from '../components/loading_row.jsx';

export const composer = ({context, bookingId}, onData) => {
  const {Meteor, Collections} = context();

  const sub = Meteor.subscribe('bookings.single', bookingId);
  if (sub.ready()) {
    const booking = Collections.Bookings.findOne(bookingId);
    const courseSub = Meteor.subscribe('courses.single', booking.courseId);
    const facilitatorSub = Meteor.subscribe('facilitators.single', booking.facilitatorId);
    const studentsSub = Meteor.subscribe('students.multiple', booking.studentIds);

    if (courseSub.ready() && facilitatorSub.ready() && studentsSub.ready()) {
      const course = booking.course();
      const facilitator = booking.facilitator();
      const students = booking.students();

      onData(null, {...booking, course, facilitator, students});
    }
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  onRemove: actions.bookings.remove
});

export default composeAll(
  composeWithTracker(composer, LoadingRow),
  useDeps(depsMapper)
)(BookingsListItem);
