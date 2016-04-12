import {Users} from '/lib/collections';
import {Meteor} from 'meteor/meteor';

export default function () {
  Meteor.publish('users.invited', function (token) {
    check(token, String);
    if (!this.userId) { return this.ready(); }

    return Users.find({'services.password.reset.token': token});
  });
}
