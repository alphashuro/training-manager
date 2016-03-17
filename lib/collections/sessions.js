import {Mongo} from 'meteor/mongo';
import Bookings from './students';
import Classes from './classes';

const Sessions = new Mongo.Collection('sessions');
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

export default Sessions;
