import {Classes} from '/lib/collections';

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('courses.classes', function (courseId) {
    check(courseId, String);

    const userId = this.userId;
    if (!userId) { return null; }

    const selector = {courseId};
    const options = {};

    return Classes.find(selector, options);
  });
}
