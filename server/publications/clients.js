import {Clients, Users} from '/lib/collections';

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

// TODO: Add publish composite
export default function () {
  Meteor.publish('clients.list', function () {
    const userId = this.userId;
    if (!userId) { return null; }

    const user = Users.findOne(userId);

    const selector = {org: user.profile.org};
    const options = {};

    return Clients.find(selector, options);
  });

  Meteor.publish('clients.single', function (clientId) {
    check(clientId, String);

    const userId = this.userId;
    if (!userId) { return null; }

    const user = Users.findOne(userId);

    const selector = {
      _id: clientId,
      org: user.profile.org
    };
    const options = {};

    return Clients.find(selector, options);
  });
}
