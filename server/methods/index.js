import users from './users';
import clients from './clients';
import students from './students';
import courses from './courses';
import classes from './classes';
import facilitators from './facilitators';
import bookings from './bookings';
import sessions from './sessions';

export default function () {
  users();
  clients();
  courses();
  facilitators();
  bookings();
  students();
  classes();
  sessions();
}
