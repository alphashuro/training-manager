import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import _ from 'underscore';
import {Roles} from 'meteor/alanning:roles';

export const Facilitators = new Mongo.Collection('facilitators');
Facilitators.helpers({
  invite() {}
});

export const Bookings = new Mongo.Collection('bookings');
Bookings.helpers({
  course() {
    return Courses.findOne(this.courseId);
  },
  /**
   * Get all students currently booked for this booking
   * @return {Array} students
   */
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

export const Courses = new Mongo.Collection('courses');
Courses.helpers({
  /**
   * Fetches all the classes for this course
   * @return {Array} Classes that belong to the course
   */
  classes() {
    return Classes.find({courseId: this._id}).fetch();
  },
  /**
   * Calcuates the total duration of a course by adding each class's duration
   * @return {int} The total duration in hours
   */
  duration() {
    return this.classes().reduce((prev, curr) => prev + curr.duration, 0);
  },
  /**
   * Calculates the total cost of a course by adding each class's price
   * @return {int} The total price in Rand
   */
  price() {
    return this.classes().reduce((prev, curr) => prev + curr.price, 0);
  }
});

export const Classes = new Mongo.Collection('classes');
Classes.helpers({
  course() {
    return Courses.findOne(this.courseId);
  }
});

export const Clients = new Mongo.Collection('clients');
Clients.helpers({
  students() {
    return Students.find({clientId: this._id}).fetch();
  }
});

export const Sessions = new Mongo.Collection('sessions');
Sessions.helpers({
  booking() {
    return Bookings.findOne(this.bookingId);
  },
  class() {
    return Classes.findOne(this.classId);
  },
  endDate() {
    const {duration} = Classes.findOne(this.classId);
    return moment(this.date).add(duration, 'hours').toDate();
  }
});

export const Users = Meteor.users;
Users.helpers({
  email() { return this.emails[0].address; },
  org() { return this.profile ? this.profile.org : ''; },
  is(role) { return Roles.userIsInRole(this._id, role); },
  name() { return this.profile ? this.profile.name : ''; },
  phone() { return this.profile ? this.profile.phone : ''; }
});

export const Students = new Mongo.Collection('students');
Students.helpers({
  client() {
    return Clients.findOne(this.clientId);
  }
});
