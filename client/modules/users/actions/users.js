export default {
  invite({Meteor, LocalState}, email ) {
    if (!email) {
      return LocalState.set('USERS_ERROR', 'Email is required when inviting users');
    }

    Meteor.call('users.invite', email, (err) => {
      if (err) {
        return LocalState.set('USERS_ERROR', err.reason);
      }
    });
  },

  clearErrors({LocalState}) {
    LocalState.set('USERS_ERROR', null);
  }
};
