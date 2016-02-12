import {Sessions} from '/lib/collections';

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('bookings.sessions', function (bookingId) {
    check(bookingId, String);

    const userId = this.userId;
    if (!userId) { return null; }

    const selector = {bookingId};
    const options = {};

    return Sessions.find(selector, options);
  });
}
