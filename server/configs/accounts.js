import {Accounts} from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor';

export default function () {
  Accounts.urls.enrollAccount = function (token) {
    return Meteor.absoluteUrl(`enroll-account/${token}`);
  };

  Accounts.urls.resetPassword = function (token) {
    return Meteor.absoluteUrl(`reset-password/${token}`);
  };

  Accounts.urls.verifyEmail = function (token) {
    return Meteor.absoluteUrl(`verify-email/${token}`);
  };

  // Create a default admin user using ADMIN_USER and ADMIN_PASS environment variables
  const email = process.env.TM_ADMIN_USER;
  const password = process.env.TM_ADMIN_PASS;

  const defaultUser = Accounts.findUserByEmail(email);

  if (!defaultUser) {
    const id = Accounts.createUser({ email, password });
    Roles.addUsersToRoles(id, 'admin');
  }
}
