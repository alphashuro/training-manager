import {Classes} from '/lib/collections';

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('courses.classes', function (courseId) {
    check(courseId, String);

    if (!this.userId) { return this.ready(); }

    return Classes.find({courseId});
  });
}
