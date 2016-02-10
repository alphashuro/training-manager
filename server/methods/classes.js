import { Classes } from '/lib/collections';

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'classes.create'({ _id, title, description, duration, price, courseId } ) {
      check(_id, String);

      // check(title, String);
      // check(description, String);
      // check(duration, Number);
      // check(price, Number);
      check(courseId, String);

      if (!_id || !courseId) {
        throw new Meteor.Error('args-missing', 'All fields are required');
      }

      // XXX: Do user authorization
      const c = {
        _id,
        title,
        description,
        duration,
        price,
        courseId
      };

      Classes.insert(c);
    },
    'classes.update'( _id, { title, description, duration, price }) {
      check(_id, String);

      check(title, String);
      check(description, String);
      check(duration, Number);
      check(price, Number);

      if (!title || !description ) {
        throw new Meteor.Error('args-missing', 'All fields are required');
      }

      Classes.update(_id, { $set: {
        title,
        description,
        duration,
        price
      } });
    },
    'classes.remove'(_id) {
      check(_id, String);

      Classes.remove(_id);
    }
  });
}
