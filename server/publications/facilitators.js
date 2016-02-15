import {Facilitators, Users} from '/lib/collections';

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('facilitators.list', function () {
    const userId = this.userId;
    if (!userId) { return null; }

    const user = Users.findOne(userId);

    const selector = {org: user.profile.org};
    const options = {};

    return Facilitators.find(selector, options);
  });

  Meteor.publish('facilitators.ids', function () {
    const userId = this.userId;
    if (!userId) { return null; }

    const user = Users.findOne(userId);

    const sel = {org: user.profile.org};
    const options = { fields: { _id: 1 }};

    return Facilitators.find(sel, options);
  });

  Meteor.publish('facilitators.single', function (facilitatorId) {
    check(facilitatorId, String);

    const userId = this.userId;
    if (!userId) { return null; }

    const user = Users.findOne(userId);

    const selector = {
      _id: facilitatorId,
      org: user.profile.org
    };
    const options = {};

    return Facilitators.find(selector, options);
  });
}
