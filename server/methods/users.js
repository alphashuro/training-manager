import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {check} from 'meteor/check';
import {Roles} from 'meteor/alanning:roles';
import {Users} from '/lib/collections';

export default function () {
  Meteor.methods({
    'users.signup'(email, password) {
      check(email, String);
      check(password, String);

      function error(name, message) {
        throw new Meteor.Error(name, message);
      }

      if (!email) {
        error('email-not-set', 'Email is required!');
      }
      if (!password) {
        error('password-not-set', 'Password is required!');
      }

      const user = {
        email,
        password,
      };

      const id = Accounts.createUser(user);
      Roles.addUsersToRoles(id, 'admin');
      return id;
    },
    'users.update'(id, {name, phone, roles}) {
      check(id, String);
      check(name, String);
      check(roles, Array);

      if (!id) {
        throw new Meteor.Error('id-not-given', 'An id is required to update a user');
      }

      if (!name) {
        throw new Meteor.Error('name-not-given', 'A name is required to update a user');
      }

      if (!phone) {
        throw new Meteor.Error('phone-not-given', 'A phone is required to update a user');
      }

      if (!roles) {
        throw new Meteor.Error('roles-not-given', 'Roles are required to update a user');
      }

      Users.update(id, {
        $set: {
          'profile.name': name,
          'profile.phone': phone
        }
      });

      Roles.setUserRoles(id, roles);
    }
  });
}
