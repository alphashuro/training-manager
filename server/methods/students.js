import { Students } from '/lib/collections';

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'students.create'({ _id, name, phone, email, clientId } ) {
      check(_id, String);

      check(name, String);
      check(phone, String);
      check(email, String);
      check(clientId, String);

      if (!_id || !clientId) {
        throw new Meteor.Error('args-missing', 'All fields are required');
      }

      // XXX: Do user authorization
      const student = {
        _id,
        name,
        phone,
        email,
        clientId
      };

      Students.insert(student);
    },
    'students.update'( _id, { name, phone, email }) {
      check(_id, String);

      check(name, String);
      check(phone, String);
      check(email, String);

      // if (!name || !phone ) {
      //   throw new Meteor.Error('args-missing', 'All fields are required');
      // }

      Students.update(_id, { $set: {
        name,
        phone,
        email
      } });
    },
    'students.remove'(_id) {
      check(_id, String);

      Students.remove(_id);
    }
  });
}
