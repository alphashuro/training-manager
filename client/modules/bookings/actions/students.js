export default {
  showModal({LocalState}) {
    LocalState.set('STUDENTS_MODAL', true);
  },

  closeModal({LocalState}) {
    LocalState.set('STUDENTS_MODAL', false);
  },

  add({Meteor, LocalState}, bookingId, studentId) {
    if (!bookingId || !studentId) {
      return LocalState.set('BOOKING_STUDENTS_ERROR', 'Booking and Student are required!');
    }

    LocalState.set('BOOKING_STUDENTS_ERROR', null);

    Meteor.call(
      'bookings.addStudent',
      bookingId, studentId,
      (error) => {
        if (error) {
          LocalState.set('BOOKING_STUDENTS_ERROR', error.reason);;
        }
      }
    );
  },

  remove({Meteor, LocalState}, bookingId, studentId) {
    if (!bookingId || !studentId) {
      return LocalState.set('BOOKING_STUDENTS_ERROR', 'Booking and student required!');
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
