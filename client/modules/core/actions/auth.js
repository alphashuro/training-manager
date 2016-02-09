export default {
  login({Meteor, LocalState, FlowRouter}, email, password) {
    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        LocalState.set('LOGIN_ERROR', error.reason);
      } else {
        FlowRouter.go('/');
      }
    });
  },
  signup({Meteor, LocalState, FlowRouter, Accounts}, email, password, org) {
    Meteor.call('users.signup', email, password, org, (error) => {
      if (error) {
        LocalState.set('SIGNUP_ERROR', error.reason);
      } else {
        this.login(email, password);
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
