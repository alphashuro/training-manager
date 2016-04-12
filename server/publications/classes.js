import {Classes} from '/lib/collections';

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('course.classes.ids', function (courseId) {
    check(courseId, String);

    if (!this.userId) { return this.ready(); }

    return Classes.find({courseId});
  });
  Meteor.publish('classes.single', function(_id) {
    check(_id, String);

    if (!this.userId) { return this.ready(); }

    return Classes.find(_id);
  })
}
