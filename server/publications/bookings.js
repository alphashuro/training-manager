import {Bookings, Sessions, Users} from '/lib/collections';

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

import {Courses, Facilitators, Students} from '/lib/collections';

export default function () {
  Meteor.publishComposite('bookings.list', {
    find() {
      if (!this.userId) { return this.ready(); }
      if (!Users.findOne(this.userId)) { return this.ready(); }

      const {profile: {org}} = Users.findOne(this.userId);

      return Bookings.find({org});
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

  Meteor.publishComposite('bookings.ids', function () {
    if (!this.userId) { return this.ready(); }
    if (!Users.findOne(this.userId)) { return this.ready(); }

    const {profile: {org}} = Users.findOne(this.userId);

    return {
      find() {
        return Bookings.find({ org }, { fields: { _id: 1 } });
      }
    }
  });

  Meteor.publishComposite('bookings.single', function (bookingId) {
    check(bookingId, String);

    if (!this.userId) { return this.ready(); }
    if (!Users.findOne(this.userId)) { return this.ready(); }

    const {profile: {org}} = Users.findOne(this.userId);

    return {
      find() {
        return Bookings.find({_id: bookingId, org})
      },
      children: [
        {
          find({courseId}) {
            return Courses.find(courseId);
          }
        },
        {
          find({facilitatorId}) {
            return Facilitators.find(facilitatorId);
          }
        },
        {
          find({_id: bookingId}) {
            return Sessions.find({bookingId});
          }
        },
        {
          find({studentIds}) {
            return Students.find({ _id: { $in: studentIds } });
          }
        }
      ]
    }
  });
}
