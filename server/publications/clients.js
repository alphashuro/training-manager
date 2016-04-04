import {Clients, Users} from '/lib/collections';

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('clients.list', function () {
    if (!this.userId) { return this.ready(); }
    if (!Users.findOne(this.userId)) { return this.ready(); }

    return Clients.find();
  });

  Meteor.publish('clients.ids', function () {
    if (!this.userId) { return this.ready(); }
    if (!Users.findOne(this.userId)) { return this.ready(); }

    return Clients.find({ fields: { _id: 1 }});
  });

  Meteor.publish('clients.single', function (_id) {
    check(_id, String);

    if (!this.userId) { return this.ready(); }
    if (!Users.findOne(this.userId)) { return this.ready(); }

    return Clients.find(_id);
  });
}
