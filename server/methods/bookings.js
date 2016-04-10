import { Bookings, Sessions, Classes } from '/lib/collections';

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'bookings.create'({ _id, courseId } ) {
      check(_id, String);

      check(courseId, String);

      if (!_id || !courseId ) {
        throw new Meteor.Error('args-missing', 'All fields are required');
      }

      Bookings.insert({_id, courseId, studentIds: [] });

      // Create sessions for the created booking;
      const classes = Classes.find({ courseId });
      classes.forEach(c => {
        let session = {
          classId: c._id,
          date: null,
          bookingId: _id,
        };

        Sessions.insert(session);
      });
    },
    'bookings.remove'(_id) {
      check(_id, String);

      Bookings.remove(_id);
    },
    'bookings.addStudent'(bookingId, studentId) {
      check(bookingId, String);
      check(studentId, String);

      Bookings.update(bookingId,
        { $addToSet:
          { studentIds: studentId }
        }
      );
    },
    'bookings.removeStudent'(bookingId, studentId) {
      check(bookingId, String);
      check(studentId, String);

      Bookings.update(bookingId,
        { $pull:
          { studentIds: studentId }
        }
      );
    }
  });
}
