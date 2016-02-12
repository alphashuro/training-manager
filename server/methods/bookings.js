import { Bookings, Sessions, Classes } from '/lib/collections';

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'bookings.create'({ _id, courseId, facilitatorId, org } ) {
      check(_id, String);

      check(courseId, String);
      check(facilitatorId, String);

      check(org, String);

      if (!_id || !courseId || !facilitatorId || !org) {
        throw new Meteor.Error('args-missing', 'All fields are required');
      }

      const studentIds = [];

      // XXX: Do user authorization
      const booking = {_id, courseId, facilitatorId, studentIds, org };
      Bookings.insert(booking);

      // Create sessions for the created booking;
      const classes = Classes.find({ courseId });
      classes.forEach(c => {
        let session = {
          classId: c._id,
          date: null,
          bookingId: _id
        };

        Sessions.insert(session);
      });
    },
    // Dont allow updates for now
    // 'bookings.update'( _id, { courseId, facilitatorId, studentIds}) {
    //   check(_id, String);

    //   check(courseId, String);
    //   check(facilitatorId, String);
    //   check(studentIds, Array);

    //   if (!courseId || !facilitatorId || !studentIds) {
    //     throw new Meteor.Error('args-missing', 'All fields are required');
    //   }

    //   Bookings.update(_id, { $set: { courseId, facilitatorId, studentIds } });
    // },
    'bookings.remove'(_id) {
      check(_id, String);

      Bookings.remove(_id);
    }
  });
}
