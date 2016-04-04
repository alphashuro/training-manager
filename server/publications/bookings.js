import {Bookings, Sessions, Users} from '/lib/collections';

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

import {Courses, Facilitators, Students} from '/lib/collections';

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
        find({facilitatorId}) {
          return Facilitators.find( facilitatorId );
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

  Meteor.publishComposite('bookings.ids', function () {
    if (!this.userId) { return this.ready(); }
    if (!Users.findOne(this.userId)) { return this.ready(); }

    return {
      find() {
        return Bookings.find({ fields: { _id: 1 } });
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
