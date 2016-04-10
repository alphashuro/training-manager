import {Bookings, Sessions, Users} from '/lib/collections';
import moment from 'moment';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

import {Courses, Students} from '/lib/collections';

export default function () {
  Meteor.publishComposite('bookings.list', {
    find() {
      if (!this.userId) { return this.ready(); }
      if (!Users.findOne(this.userId)) { return this.ready(); }

      return Bookings.find();
    },
    children: [
      {
        find({courseId}) {
          return Courses.find( courseId );
        }
      },
      {
        find({studentIds}) {
          return Students.find({
            _id: {
              $in: studentIds
            }
          });
        }
      }
    ]
  });
  // publish bookings with sessions coming up in a month
  Meteor.publishComposite('bookings.coming_up', {
    find() {
      if (!this.userId) { return this.ready(); }
      if (!Users.findOne(this.userId)) { return this.ready(); }

      const now = new Date();
      const aMonthFromNow = moment().add(1, 'months').toDate();

      const bookingIds = Sessions.find({
        date: {
          $gt: now,
          $lt: aMonthFromNow
        }
      }, { fields: { bookingId: 1 } }).fetch();

      return Bookings.find({_id: { $in: bookingIds }});
    }
  });

  Meteor.publishComposite('bookings.ids', function () {
    if (!this.userId) { return this.ready(); }
    if (!Users.findOne(this.userId)) { return this.ready(); }

    return {
      find() {
        return Bookings.find({}, { fields: { _id: 1 } });
      }
    }
  });

  Meteor.publishComposite('bookings.single', function (_id) {
    check(_id, String);

    if (!this.userId) { return this.ready(); }
    if (!Users.findOne(this.userId)) { return this.ready(); }

    return {
      find() {
        return Bookings.find(_id);
      },
      children: [
        {
          find({courseId}) {
            return Courses.find(courseId);
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
