import {Meteor} from 'meteor/meteor';
import {Ground} from 'meteor/ground:db';
import moment from 'moment';
import {Mongo} from 'meteor/mongo';

// import all the collections
export Classes from './classes';
export Courses from './courses';
export Facilitators from './facilitators';
export Clients from './clients';
export Students from './students';
export Bookings from './students';
export Sessions from './students';
export Users from './students';

const collections = [Classes, Courses, Facilitators, Clients, Students, Bookings, Sessions, Users];

for (let collection in collections) {
  // Ground all the collections to save them locally in client's cache.
  Ground.Collection(collection);
  // Timestamp all the collections to track creations and updates
  collection.timestampable();
  // TODO: add allow and deny rules
}

export default { Classes, Courses, Facilitators, Clients, Students, Bookings, Sessions, Users };
