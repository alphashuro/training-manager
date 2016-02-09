import { Clients } from '/lib/collections';

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'clients.create'({ _id, name, phone, email, org } ) {
      check(_id, String);

      check(name, String);
      check(phone, String);
      check(email, String);
      check(org, String);

      if (!_id || !name || !phone || !email || !org) {
        throw new Meteor.Error('args-missing', 'All fields are required');
      }

      // XXX: Do user authorization
      const client = {_id, name, phone, email, org};
      Clients.insert(client);
    },
    'clients.update'( _id, { name, phone, email}) {
      check(_id, String);

      check(name, String);
      check(phone, String);
      check(email, String);

      if (!name || !phone || !email) {
        throw new Meteor.Error('args-missing', 'All fields are required');
      }

      Clients.update(_id, { $set: { name, phone, email } });
    },
    'clients.remove'(_id) {
      check(_id, String);

      Clients.remove(_id);
    }
  });
}
