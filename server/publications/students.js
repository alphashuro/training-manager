import {Students, Users} from '/lib/collections';

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('client.students', function (clientId) {
    check(clientId, String);

    const selector = {clientId};
    return Students.find(selector);
  });
}
