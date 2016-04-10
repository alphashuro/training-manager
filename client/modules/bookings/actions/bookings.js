export default {
  create({ Meteor, LocalState, FlowRouter }, courseId ) {
    if (!courseId) {
      return LocalState.set('BOOKING_ERROR', 'Course selection is required!');
    }
    LocalState.set('BOOKING_ERROR', null);

    const _id = Meteor.uuid();
    const user = Meteor.user();

    Meteor.call( 'bookings.create', { _id, courseId }, (error) => {
      if (error) {
        return LocalState.set('BOOKING_ERROR', error.reason);
      } else {
        FlowRouter.go(`/bookings/${_id}`);
      }
    });
  },

  remove({Meteor, LocalState}, id) {
    if (!id) {
      return LocalState.set('BOOKING_ERROR', 'Id is required.');
    }

    Meteor.call('bookings.remove', id, (error) => {
      if (error) { LocalState.set('BOOKING_ERROR', error.reason); }
    });
  },

  clearErrors({LocalState}) {
    return LocalState.set('BOOKING_ERROR', null);
  }
};
