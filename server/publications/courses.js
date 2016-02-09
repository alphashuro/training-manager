import {Courses, Classes} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('courses.list', function () {
    const selector = {};
    const options = {};

    return Courses.find(selector, options);
  });

  Meteor.publish('courses.single', function (courseId) {
    check(courseId, String);
    const selector = {_id: courseId};
    return Courses.find(selector);
  });

  Meteor.publish('courses.classes', function (courseId) {
    check(courseId, String);
    const selector = {courseId};
    return Classes.find(selector);
  });
}
