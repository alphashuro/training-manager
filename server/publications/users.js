import {Users} from '/lib/collections';
import {Meteor} from 'meteor/meteor';

export default function () {
  Meteor.publish('users.invited', function (token) {
    check(token, String);
    if (!this.userId) { return this.ready(); }

    return Users.find({'services.password.reset.token': token});
  });
  Meteor.publish('users.ids', function userIdsPublication() {
    if (!this.userId) { return this.ready(); }
    // FIXME: We'll need to check if this user is admin, but for now i'll just publish to all users

    return Users.find();
  });
  Meteor.publish('users.single', function singleUserPublication(userId) {
    check(userId, String);
    if (!this.userId) { return this.ready(); }
    // FIXME: Also need to check admin role here
    return Users.find({_id: userId});
  })
}
