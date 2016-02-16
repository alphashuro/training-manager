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
        error('email-not-set', 'Email is required!');
      }
      if (!password) {
        error('password-not-set', 'Password is required!');
      }
      if (!org) {
        error('org-not-set', 'Organization/Company name is required!');
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
