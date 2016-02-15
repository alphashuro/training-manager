import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import {Ground} from 'meteor/ground:db';
import {Roles} from 'meteor/alanning:roles';
import moment from 'moment';

// TODO: Add allow/deny rules
export const Courses = new Mongo.Collection('courses');
Courses.timestampable();
Ground.Collection(Courses);
Courses.helpers({
  classes() {
    return Classes.find( {courseId: this._id} ).fetch();
  },
  duration() {
    return 0;
  },
  price() {
    return 0;
  }
});
export const Classes = new Mongo.Collection('classes');
Classes.timestampable();
Ground.Collection(Classes);
Classes.helpers({
  course() {
    return Courses.findOne(this.courseId);
  }
});

export const Facilitators = new Mongo.Collection('facilitators');
Facilitators.timestampable();
Ground.Collection(Facilitators);
Facilitators.helpers({
  invite() {}
});
export const Clients = new Mongo.Collection('clients');
Clients.timestampable();
Ground.Collection(Clients);
Clients.helpers({
  students() {
    return Students.find({clientId: this._id}).fetch();
  }
});
export const Students = new Mongo.Collection('students');
Students.timestampable();
Ground.Collection(Students);
Students.helpers({
  client() {
    return Clients.findOne(this.clientId);
  }
});
export const Bookings = new Mongo.Collection('bookings');
Bookings.timestampable();
Ground.Collection(Bookings);
Bookings.helpers({
  course() {
    return Courses.findOne(this.courseId);
  },
  facilitator() {
    return Facilitators.findOne(this.facilitatorId);
  },
  students() {
    return Students.find({
      _id: {
        $in: this.studentIds
      }
    }).fetch();
  },
  sessions() {
    return Sessions.find({bookingId: this._id}).fetch();
  }
});
export const Sessions = new Mongo.Collection('sessions');
Sessions.timestampable();
Ground.Collection(Sessions);
Sessions.helpers({
  booking() {
    return Bookings.findOne(this.bookingId);
  },
  class() {
    return Classes.findOne(this.classId);
  },
  endDate() {
    const cl = Classes.findOne(this.classId);
    const {duration} = cl;

    return moment(this.date).add(duration, 'hours').toDate();
  }
});

export const Users = Meteor.users;
// Users.timestampable();
Ground.Collection(Users);
Users.helpers({
  org() { return this.profile.org; },
  is(role) { return Roles.userIsInRole(this._id, role); },
  email() { return this.emails[0].address; }
});
