import {Mongo} from 'meteor/mongo';
import Students from './students';

const Clients = new Mongo.Collection('clients');
Clients.helpers({
  students() {
    return Students.find({clientId: this._id}).fetch();
  }
});

export default Clients;
