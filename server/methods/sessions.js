import { Sessions } from '/lib/collections';

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'sessions.update'( _id, { date }) {
      check(_id, String);

      check(date, Date);

      Sessions.update(_id, { $set: {
        date
      } });
    }
  });
}
