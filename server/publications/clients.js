import {Clients, Students} from '/lib/collections';

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

// TODO: Add publish composite
export default function () {
  Meteor.publish('clients.list', function () {
    const selector = {};
    const options = {};

    return Clients.find(selector, options);
  });

  Meteor.publish('clients.single', function (clientId) {
    check(clientId, String);
    const selector = {_id: clientId};
    const options = {};

    return Clients.find(selector, options);
  });

  Meteor.publish('client.students', function (clientId) {
    check(clientId, String);

    const selector = {clientId};
    return Students.find(selector);
  });
}
