import {Users} from '/lib/collections';

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('facilitators.list', function () {
    if (!this.userId) { return this.ready(); }
    if (!Users.findOne(this.userId)) { return this.ready(); }

    const {profile: {org}} = Users.findOne(this.userId);

    return Users.find({
      'profile.org': org,
      roles: 'facilitator',
    });
  });

  Meteor.publish('facilitators.ids', function () {
    if (!this.userId) { return this.ready(); }
    if (!Users.findOne(this.userId)) { return this.ready(); }

    const {profile: {org}} = Users.findOne(this.userId);

    const sel = {
      'profile.org': org,
      roles: 'facilitator'
    };
    const options = { fields: { _id: 1 }};

    return Users.find(sel, options);
  });

  Meteor.publish('facilitators.single', function (_id) {
    check(_id, String);

    if (!this.userId) { return this.ready(); }
    if (!Users.findOne(this.userId)) { return this.ready(); }

    const {profile: {org}} = Users.findOne(this.userId);

    return Users.find({
      _id,
      'profile.org': org,
      roles: 'facilitator',
    });
  });
}
