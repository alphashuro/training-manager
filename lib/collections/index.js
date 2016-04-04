// import {Ground} from 'meteor/ground:db';
import moment from 'moment';
import {Mongo} from 'meteor/mongo';

// import all the collections
import Classes from './classes';
import Courses from './courses';
import Facilitators from './facilitators';
import Clients from './clients';
import Students from './students';
import Bookings from './students';
import Sessions from './students';
import Users from './students';

const collections = [Classes, Courses, Facilitators, Clients, Students, Bookings, Sessions, Users];

for (const collection of collections) {
  // Ground all the collections to save them locally in client's cache.
  // Ground.Collection(collection);
  // Timestamp all the collections to track creations and updates
  collection.timestampable();
  // TODO: add allow and deny rules
}

export { Classes, Courses, Facilitators, Clients, Students, Bookings, Sessions, Users };

export default { Classes, Courses, Facilitators, Clients, Students, Bookings, Sessions, Users };
