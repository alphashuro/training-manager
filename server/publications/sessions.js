import {Sessions, Classes} from '/lib/collections';

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('bookings.sessions', function (bookingId) {
    check(bookingId, String);

    if (!this.userId) { return this.ready(); }

    return Sessions.find({bookingId});
  });

  Meteor.publishComposite('sessions.all', {
    find() {
      if (!this.userId) { return this.ready(); }

      return Sessions.find();
    },
    children: [
      {
        find(session) {
          return Classes.find(session.classId);
        }
      }
    ]
  });

  Meteor.publishComposite('sessions.single', function (sessionId) {
    if (!this.userId) { return this.ready(); }

    return {
      find() {
        return Sessions.find({_id: sessionId}, options);
      },
      children: [
        {
          find({classId}) {
            return Classes.find(classId);
          }
        }
      ]
    }
  });
}
