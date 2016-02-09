import { Facilitators } from '/lib/collections';

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'facilitators.create'({ _id, name, phone, email, org } ) {
      check(_id, String);

      check(name, String);
      check(phone, String);
      check(email, String);
      check(org, String);

      if (!_id || !name || !phone || !email || !org) {
        throw new Meteor.Error('args-missing', 'All fields are required');
      }

      // XXX: Do user authorization
      const facilitator = {_id, name, phone, email, org};
      Facilitators.insert(facilitator);
    },
    'facilitators.update'( _id, { name, phone, email}) {
      check(_id, String);

      check(name, String);
      check(phone, String);
      check(email, String);

      if (!name || !phone || !email) {
        throw new Meteor.Error('args-missing', 'All fields are required');
      }

      Facilitators.update(_id, { $set: { name, phone, email } });
    },
    'facilitators.remove'(_id) {
      check(_id, String);

      Facilitators.remove(_id);
    }
  });
}
