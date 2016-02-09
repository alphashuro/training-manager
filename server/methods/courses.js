import { Courses } from '/lib/collections';

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'courses.create'({ _id, title, description, org } ) {
      check(_id, String);

      check(title, String);
      check(description, String);
      check(org, String);

      if (!_id || !title || !description || !org) {
        throw new Meteor.Error('args-missing', 'All fields are required');
      }

      // XXX: Do user authorization
      const course = {_id, title, description, org};
      Courses.insert(course);
    },
    'courses.update'( _id, { title, description, }) {
      check(_id, String);

      check(title, String);
      check(description, String);

      if (!title || !description ) {
        throw new Meteor.Error('args-missing', 'All fields are required');
      }

      Courses.update(_id, { $set: { title, description } });
    },
    'courses.remove'(_id) {
      check(_id, String);

      Courses.remove(_id);
    }
  });
}
