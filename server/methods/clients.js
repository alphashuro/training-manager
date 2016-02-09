import { Clients, Students } from '/lib/collections';

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'clients.create'() {},
    'clients.update'() {},
    'clients.remove'() {}
  });

  Meteor.methods({
    'clients.createStudent'() {},
    'clients.updateStudent'() {},
    'clients.removeStudent'() {}
  });
}
