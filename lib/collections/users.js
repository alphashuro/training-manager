import {Mongo} from 'meteor/mongo';
import {Roles} from 'meteor/alanning:roles';

const Users = Meteor.users;
Users.helpers({
  email() { return this.emails[0].address; },
  org() { return this.profile.org; },
  is(role) { return Roles.userIsInRole(this._id, role); },
});

export default Users;
