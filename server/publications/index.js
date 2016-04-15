import facilitators from './facilitators';
import clients from './clients';
import students from './students';
import courses from './courses';
import classes from './classes';
import bookings from './bookings';
import sessions from './sessions';
import users from './users';

export default function () {
  facilitators();
  clients();
  students();
  courses();
  classes();
  bookings();
  sessions();
  users();
}
