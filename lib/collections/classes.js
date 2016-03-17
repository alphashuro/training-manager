import {Mongo} from 'meteor/mongo';
import Courses from './courses';

const Classes = new Mongo.Collection('classes');
Classes.helpers({
  course() {
    return Courses.findOne(this.courseId);
  }
});

export default Classes;
