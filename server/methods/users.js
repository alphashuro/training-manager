import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {check} from 'meteor/check';
import {Roles} from 'meteor/alanning:roles';

export default function () {
  Meteor.methods({
    'users.signup'(email, password, org) {
      check(email, String);
      check(password, String);
      check(org, String);

      function error(name, message) {
        throw new Meteor.Error(name, message);
      }

      if (!email) {
        error('email-not-set', 'Need to set an email address.');
      }
      if (!password) {
        error('password-not-set', 'Need to set a password');
      }
      if (!org) {
        error('org-not-set', 'Need to set an organization name');
      }

      const user = {
        email,
        password,
        profile: {
          org
        }
      };

      const id = Accounts.createUser(user);
      Roles.addUsersToRoles(id, 'admin');
      return id;
    }
  });
}
