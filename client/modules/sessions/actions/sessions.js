export default {
  update({ Meteor, LocalState }, id, { date }) {
    if (!id) {
      return LocalState.set('SESSIONS_ERROR', 'Id is required!');
    }

    if (!date) {
      return LocalState.set('SESSIONS_ERROR', 'Date is required!');
    }

    Meteor.call( 'sessions.update', id, { date }, (err) => {
      if (err) {
        LocalState.set('SESSIONS_ERROR', err.reason);
      }
    });
  },

  clearErrors({LocalState}) {
    return LocalState.set('SESSIONS_ERROR', null);
  }
};
