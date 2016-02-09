import { Bookings, Sessions } from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

// TODO: Add publish composite
export default function () {
  Meteor.publish('bookings.list', function () {
    const selector = {};
    const options = {};

    return Bookings.find(selector, options);
  });

  Meteor.publish('bookings.single', function (bookingId) {
    check(bookingId, String);
    const selector = {_id: bookingId};

    return Bookings.find(selector);
  });

  Meteor.publish('bookings.sessions', function (bookingId) {
    check(bookingId, String);

    const selector = {bookingId};

    return Sessions.find(bookingId);
  });
}
