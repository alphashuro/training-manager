import {Students, Bookings} from '/lib/collections';

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('clients.students', function (clientId) {
    check(clientId, String);

    const userId = this.userId;
    if (!userId) { return null; }

    const selector = {clientId};
    const options = {};

    const cursor = Students.find(selector, options);
    return cursor;
  });

  Meteor.publish('clients.students.ids', function (clientId) {
    check(clientId, String);

    const userId = this.userId;
    if (!userId) { return null; }

    const selector = {clientId};
    const options = {fields: { _id: 1 }};

    const cursor = Students.find(selector, options);
    return cursor;
  });

  Meteor.publish('bookings.students', function (studentIds = []) {
    check(studentIds, Array);

    const userId = this.userId;
    if (!userId) { return null; }

    const selector = {_id: { $in: studentIds } };
    const options = {};

    return Students.find(selector, options);
  });

  Meteor.publish('bookings.students.ids', function (bookingId) {
    check(bookingId, String);

    const userId = this.userId;
    if (!userId) { return null; }
    const booking = Bookings.findOne(bookingId);

    const selector = {_id: { $in: booking.studentIds } };
    const options = {
      fields: {
        _id: 1
      }
    };

    return Students.find(selector, options);
  });

  Meteor.publish('students.multiple', function (studentIds = []) {
    check(studentIds, Array);

    const userId = this.userId;
    if (!userId) { return null; }

    const selector = {_id: { $in: studentIds } };
    const options = {};

    return Students.find(selector, options);
  });

  Meteor.publish('students.single', function (studentId) {
    check(studentId, String);

    const userId = this.userId;
    if (!userId) { return null; }

    const selector = {_id: studentId };
    const options = {};

    return Students.find(selector, options);
  });
}
