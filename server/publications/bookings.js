import {Bookings, Sessions, Users} from '/lib/collections';

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

import {Courses, Facilitators, Students} from '/lib/collections';

export default function () {
  Meteor.publishComposite('bookings.list', {
    find() {
      const userId = this.userId;
      if (!userId) { return null; }

      const user = Users.findOne(userId);

      const selector = {org: user.profile.org};
      const options = {};

      return Bookings.find(selector, options);
    },
    children: [
      {
        find(booking) {
          return Courses.find( booking.courseId );
        }
      },
      {
        find(booking) {
          return Facilitators.find( booking.facilitatorId );
        }
      },
      {
        find(booking) {
          return Students.find({
            _id: {
              $in: booking.studentIds
            }
          });
        }
      }
    ]
  });

  Meteor.publish('bookings.ids', function () {
    const userId = this.userId;
    if (!userId) { return null; }

    const user = Users.findOne(userId);

    const selector = {org: user.profile.org};
    const options = {fields: {_id: 1}};

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

    const bookingCursor = Bookings.find(selector, options);

    const booking = Bookings.findOne(selector);
    const courseCursor = Courses.find(booking.courseId);
    const facilitatorCursor = Facilitators.find(booking.facilitatorId);
    const sessionsCursor = Sessions.find({bookingId: booking._id});
    const studentsCursor = Students.find({
      _id: {
        $in: booking.studentIds
      }
    });

    return [ bookingCursor, courseCursor, facilitatorCursor, sessionsCursor, studentsCursor ];
  });

  // Meteor.publishComposite('bookings.single', {
  //   find(bookingId) {
  //     check(bookingId, String);

  //     const userId = this.userId;
  //     if (!userId) { return null; }

  //     const user = Users.findOne(userId);

  //     const selector = {
  //       _id: bookingId,
  //       org: user.profile.org
  //     };
  //     const options = {};

  //     return Bookings.find(selector, options);
  //   },
  //   children: [
  //     {
  //       find(booking) {
  //         return Courses.find( booking.courseId );
  //       }
  //     },
  //     {
  //       find(booking) {
  //         return Facilitators.find( booking.facilitatorId );
  //       }
  //     }
  //   ]
  // });
}
