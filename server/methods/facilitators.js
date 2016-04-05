import { Users } from '/lib/collections';

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Roles} from 'meteor/alanning:roles';
import {Accounts} from 'meteor/accounts-base';

export default function () {
  Meteor.methods({
    'facilitators.create'({ name, phone, email } ) {

      check(name, String);
      check(phone, String);
      check(email, String);

      if ( !name || !phone || !email ) {
        throw new Meteor.Error('args-missing', 'All fields are required');
      }

      const facilitator = {
        email,
        profile: {
          name,
          phone
        }
      };

      const id = Accounts.createUser(facilitator);
      Roles.addUsersToRoles(id, 'facilitator');
      return id;
    },
    'facilitators.update'( _id, { name, phone }) {
      check(_id, String);

      check(name, String);
      check(phone, String);

      if (!name || !phone ) {
        throw new Meteor.Error('args-missing', 'All fields are required');
      }

      Users.update(_id, {
        $set: {
          'profile.name': name,
          'profile.phone': phone
        }
      });
    },
    'facilitators.remove'(_id) {
      check(_id, String);

      Users.remove(_id);
    },
    'facilitators.invite'(id) {
      check(id, String);
      Accounts.sendEnrollmentEmail(id);
    }
  });
}
