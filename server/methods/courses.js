import { Courses, Classes } from '/lib/collections';

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'courses.create'() {},
    'courses.update'() {},
    'courses.remove'() {}
  });

  Meteor.methods({
    'courses.createClass'() {},
    'courses.updateClass'() {},
    'courses.removeClass'() {}
  });
}
