import {Users} from '/lib/collections';
import {Meteor} from 'meteor/meteor';

export default function () {
  Meteor.publish('users.enrolled', function (token) {
    return Users.find({'services.password.reset.token': token});
  });
}
