import users from './users';
import clients from './clients';
import courses from './courses';
import facilitators from './facilitators';
import bookings from './bookings';

export default function () {
  users();
  clients();
  courses();
  facilitators();
  bookings();
}
