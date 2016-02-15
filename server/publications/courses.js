import {Courses, Users} from '/lib/collections';

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('courses.list', function () {
    const userId = this.userId;
    if (!userId) { return null; }

    const user = Users.findOne(userId);

    const selector = {org: user.profile.org};
    const options = {};

    return Courses.find(selector, options);
  });

  Meteor.publish('courses.ids', function () {
    const userId = this.userId;
    if (!userId) { return null; }

    const user = Users.findOne(userId);

    const selector = {org: user.profile.org};
    const options = { fields: { _id: 1 }};

    return Courses.find(selector, options);
  });

  Meteor.publish('courses.single', function (courseId) {
    check(courseId, String);

    const userId = this.userId;
    if (!userId) { return null; }

    const user = Users.findOne(userId);

    const selector = {
      _id: courseId,
      org: user.profile.org
    };
    const options = {};

    return Courses.find(selector, options);
  });
}
