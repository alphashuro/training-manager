import {Users} from '/lib/collections';

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('facilitators.list', function () {
    if (!this.userId) { return this.ready(); }
    if (!Users.findOne(this.userId)) { return this.ready(); }

    return Users.find({ roles: 'facilitator' });
  });

  Meteor.publish('facilitators.ids', function () {
    if (!this.userId) { return this.ready(); }
    if (!Users.findOne(this.userId)) { return this.ready(); }

    return Users.find({ roles: 'facilitator' }, { fields: { _id: 1 }});
  });

  Meteor.publish('facilitators.single', function (_id) {
    check(_id, String);

    if (!this.userId) { return this.ready(); }
    if (!Users.findOne(this.userId)) { return this.ready(); }

    return Users.find({ _id, roles: 'facilitator' });
  });
}
