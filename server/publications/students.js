import {Students, Bookings, Clients} from '/lib/collections';

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('clients.students', function (clientId) {
    check(clientId, String);

    if (!this.userId) { return this.ready(); }

    return Students.find({clientId});
  });

  Meteor.publish('client.students.ids', function (clientId) {
    check(clientId, String);

    if (!this.userId) { return this.ready(); }

    return Students.find({clientId}, {fields: { _id: 1 }});
  });

  Meteor.publish('bookings.students', function (studentIds = []) {
    check(studentIds, Array);

    if (!this.userId) { return this.ready(); }

    return Students.find({_id: { $in: studentIds } });
  });

  Meteor.publish('bookings.students.ids', function (bookingId) {
    check(bookingId, String);

    if (!this.userId) { return this.ready(); }
    const {studentIds} = Bookings.findOne(bookingId);

    return Students.find({_id: { $in: studentIds } }, { fields: { _id: 1 } });
  });

  Meteor.publish('students.multiple', function (studentIds = []) {
    check(studentIds, Array);

    if (!this.userId) { return this.ready(); }

    return Students.find({ _id: { $in: studentIds } });
  });

  Meteor.publishComposite('students.single', function (studentId) {
    check(studentId, String);

    if (!this.userId) { return this.ready(); }

    return {
      find() {
        return Students.find({ _id: studentId });
      },
      children: [
        {
          find({clientId}) {
            return Clients.find({ _id: clientId });
          }
        }
      ]
    }
  });
}
