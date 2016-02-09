import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

// TODO: Add allow/deny rules
// TODO: Add collection helpers
export const Courses = new Mongo.Collection('courses');
export const Classes = new Mongo.Collection('classes');
export const Facilitators = new Mongo.Collection('facilitators');
export const Clients = new Mongo.Collection('clients');
export const Students = new Mongo.Collection('students');
export const Bookings = new Mongo.Collection('bookings');
export const Sessions = new Mongo.Collection('sessions');

export const Users = Meteor.users;
