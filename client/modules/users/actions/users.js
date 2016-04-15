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

  setPassword({Accounts, LocalState, FlowRouter}, token, newPassword, confirmPassword) {
    if (!token) {
      return LocalState.set('ENROLL_ERROR', 'A token is required to reset your password.');
    }

    if (!newPassword) {
      return LocalState.set('ENROLL_ERROR', 'A new password is required.');
    }

    if (!confirmPassword) {
      return LocalState.set('ENROLL_ERROR', 'Please confirm your password.');
    }

    if (newPassword !== confirmPassword) {
      return LocalState.set('ENROLL_ERROR', 'Passwords do not match.');
    }

    Accounts.resetPassword(token, newPassword, err => {
      if (err) LocalState.set('ENROLL_ERROR', err.reason);
      else FlowRouter.go('/');
    });
  },

  clearErrors({LocalState}) {
    LocalState.set('USERS_ERROR', null);
  }
};
