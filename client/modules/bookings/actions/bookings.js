export default {
  create({ Meteor, LocalState, FlowRouter }, courseId, facilitatorId ) {
    if (!courseId) {
      return LocalState.set('BOOKING_ERROR', 'Course selection is required!');
    }
    if (!facilitatorId) {
      return LocalState.set('BOOKING_ERROR', 'Facilitator selection is required!');
    }

    LocalState.set('BOOKING_ERROR', null);

    const _id = Meteor.uuid();
    const user = Meteor.user();
    const org = user.profile.org;

    Meteor.call( 'bookings.create', { _id, courseId, facilitatorId, org }, (error) => {
      if (error) {
        return LocalState.set('BOOKING_ERROR', error.reason);
      }
    });

    FlowRouter.go(`/bookings/${_id}`);
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
