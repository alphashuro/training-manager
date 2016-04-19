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

  // TODO: add the ability to update and add/remove emails
  update({LocalState, Meteor}, id, {name, phone, roles}) {
    if (!id) return LocalState.set('USER_ERROR', 'Id is required to update a user');
    if (!name) return LocalState.set('USER_ERROR', 'Name is required to update a user');
    if (!phone) return LocalState.set('USER_ERROR', 'Phone is required to update a user');
    if (!roles) return LocalState.set('USER_ERROR', 'Roles are required to update a user');

    Meteor.call('users.update', id, {name, phone, roles}, function updateUserCallback(error) {
      if (error) { LocalState.set('USER_ERROR', error.reason); }
    });
  },

  clearErrors({LocalState}) {
    LocalState.set('USERS_ERROR', null);
  }
};
