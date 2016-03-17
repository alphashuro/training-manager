import {Mongo} from 'meteor/mongo';
import Classes from './classes';
import _ from 'underscore';

const Courses = new Mongo.Collection('courses');

/**
 * The Course collection's helpers
 */
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

export default Courses;
