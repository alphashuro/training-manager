import {Facilitators} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('facilitators.list', function () {
    const selector = {};
    const options = {};

    return Facilitators.find(selector, options);
  });

  Meteor.publish('facilitators.single', function (facilitatorId) {
    check(facilitatorId, String);
    const selector = {_id: facilitatorId};
    return Facilitators.find(selector);
  });
}
