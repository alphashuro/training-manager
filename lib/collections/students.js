import {Mongo} from 'meteor/mongo';
import Clients from './clients';

const Students = new Mongo.Collection('students');
Students.helpers({
  client() {
    return Clients.findOne(this.clientId);
  }
});

export default Students;
