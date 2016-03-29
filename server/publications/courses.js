import {Courses, Users} from '/lib/collections';

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('courses.list', function () {
    if (!this.userId) { return this.ready(); }
    if (!Users.findOne(this.userId)) { return this.ready(); }

    const {profile: {org}} = Users.findOne(this.userId);

    return Courses.find({org});
  });

  Meteor.publish('courses.ids', function () {
    if (!this.userId) { return this.ready(); }
    if (!Users.findOne(this.userId)) { return this.ready(); }

    const {profile: {org}} = Users.findOne(this.userId);

    return Courses.find({org}, { fields: { _id: 1 }});
  });

  Meteor.publish('courses.single', function (_id) {
    check(_id, String);

    if (!this.userId) { return this.ready(); }
    if (!Users.findOne(this.userId)) { return this.ready(); }

    const {profile: {org}} = Users.findOne(this.userId);

    return Courses.find({
      _id,
      org,
    });
  });
}
