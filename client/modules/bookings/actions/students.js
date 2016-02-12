export default {
  showModal({LocalState}) {
    LocalState.set('STUDENTS_MODAL', true);
  },

  closeModal({LocalState}) {
    LocalState.set('STUDENTS_MODAL', false);
  },

  add({Meteor, LocalState}, bookingId, studentId) {
    if (!bookingId || !studentId) {
      return LocalState.set('BOOKING_STUDENTS_ERROR', 'Parameters missing!');
    }

    LocalState.set('BOOKING_STUDENTS_ERROR', null);

    Meteor.call(
      'bookings.addStudent',
      bookingId, studentId,
      (error) => {
        if (error) {
          return LocalState.set('BOOKING_STUDENTS_ERROR', error.reason);
        }
      }
    );
  },

  remove({Meteor, LocalState}, bookingId, studentId) {
    if (!bookingId || !studentId) {
      return LocalState.set('BOOKING_STUDENTS_ERROR', 'Parameters missing!');
    }

    Meteor.call(
      'bookings.removeStudent',
      bookingId,
      studentId,
      (error) => {
        if (error) {
          return LocalState.set('BOOKING_STUDENTS_ERROR', error.reason);
        }
      }
    );
  },

  clearErrors({LocalState}) {
    return LocalState.set('BOOKING_STUDENTS_ERROR', null);
  }
};
