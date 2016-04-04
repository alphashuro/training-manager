export default {
  login({Meteor, LocalState, FlowRouter}, email, password) {
    if (!email) {
      return LocalState.set('LOGIN_ERROR', 'Email is required!');
    }
    if (!password) {
      return LocalState.set('LOGIN_ERROR', 'Password is required');
    }

    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        LocalState.set('LOGIN_ERROR', error.reason);
      } else {
        FlowRouter.go('/');
      }
    });
  },
  signup({Meteor, LocalState, FlowRouter, Accounts}, email, password) {
    if (!email) {
      return LocalState.set('SIGNUP_ERROR', 'Email is required!');
    }

    if (!password) {
      return LocalState.set('SIGNUP_ERROR', 'Password is required!');
    }

    Meteor.call('users.signup', email, password, (error) => {
      if (error) {
        LocalState.set('SIGNUP_ERROR', error.reason);
      } else {
        FlowRouter.go('/login');
      }
    });
  },
  logout({Meteor, LocalState}) {
    Meteor.logout((error) => {
      if (error) {
        LocalState.set('LOGOUT_ERROR', error.reason);
      }
    });
  },
  clearLoginErrors({LocalState}) {
    return LocalState.set('LOGIN_ERROR', null);
  },
  clearSignupErrors({LocalState}) {
    return LocalState.set('SIGNUP_ERROR', null);
  },
  clearLogoutErrors({LocalState}) {
    return LocalState.set('LOGOUT_ERROR', null);
  }
};
