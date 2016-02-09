import {Bookings, Users} from '/lib/collections';

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

// TODO: Add publish composite
export default function () {
  Meteor.publish('bookings.list', function () {
    const userId = this.userId;
    if (!userId) { return null; }

    const user = Users.findOne(userId);

    const selector = {org: user.profile.org};
    const options = {};

    return Bookings.find(selector, options);
  });

  Meteor.publish('bookings.single', function (bookingId) {
    check(bookingId, String);

    const userId = this.userId;
    if (!userId) { return null; }

    const user = Users.findOne(userId);

    const selector = {
      _id: bookingId,
      org: user.profile.org
    };
    const options = {};

    return Bookings.find(selector, options);
  });
}
