export default {
  update({ Meteor, LocalState }, id, { date }) {
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
