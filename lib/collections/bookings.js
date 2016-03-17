import {Mongo} from 'meteor/mongo';
import Courses from './courses';
import Students from './students';
import Facilitators from './facilitators';
import Sessions from './students';

const Bookings = new Mongo.Collection('bookings');

Bookings.helpers({
  course() {
    return Courses.findOne(this.courseId);
  },
  facilitator() {
    return Facilitators.findOne(this.facilitatorId);
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

export default Bookings;
