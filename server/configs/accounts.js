import {Accounts} from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor';
import {Users} from '/lib/collections';

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

  Accounts.emailTemplates.from = "Training Manager <alpha@aepit.co.za>";
  Accounts.emailTemplates.enrollAccount.subject = function (user) {
    return user.profile.name + ", you've been invited to use the Training App.";
  Accounts.emailTemplates.enrollAccount.text = function (user, url) {
    return  "Hello " + user.profile.name,
            + "You have been invited to use the Training App.\n\n"
            + "To activate your account, simply click the link below:\n\n"
            + url;
  };
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
