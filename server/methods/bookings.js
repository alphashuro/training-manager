import { Bookings, Sessions } from '/lib/collections';

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'bookings.create'() {},
    'bookings.update'() {},
    'bookings.remove'() {}
  });

  Meteor.methods({
    'bookings.updateSession'() {}
  });
}
