import * as Collections from '/lib/collections';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

const users = [
  {
    profile: {
      org: 'aepit',
      role: 'admin'
    },
    email: 'alpha@aepit.co.za',
    password: 'password'
  }
];

const clients = [
  {
    _id: '1',
    name: 'Client 1',
    email: 'admin@client1.com',
    phone: '016 924 9083',
    org: 'aepit'
  },
  {
    _id: '2',
    name: 'Client 2',
    email: 'admin@client2.com',
    phone: '016 924 3423',
    org: 'aepit'
  }
];
const students = [
  {
    _id: '1',
    name: 'Student 1',
    email: 'student1@client1.com',
    phone: '083 343 2342',
    clientId: '1'
  },{
    _id: '2',
    name: 'Student 2',
    email: 'student2@client1.com',
    phone: '073 716 2858',
    clientId: '1'
  },{
    _id: '3',
    name: 'Student 1',
    email: 'student1@client2.com',
    phone: '063 234 8496',
    clientId: '2'
  },{
    _id: '4',
    name: 'Student 2',
    email: 'student2@client2.com',
    phone: '072 654 5768',
    clientId: '2'
  },
];

const courses = [
  {
    _id: '1',
    title: 'Course 1',
    description: 'A course course like',
    org: 'aepit'
  },
  {
    _id: '2',
    title: 'Course 2',
    description: 'A course yet course like',
    org: 'aepit'
  }
];
const classes = [
  {
    _id: '1',
    title: 'Class 1a',
    description: 'We do class-like things in this class.',
    duration: 2,
    price: 1000,
    courseId: '1'
  },
  {
    _id: '2',
    title: 'Class 2a',
    description: 'We do class-like things in this class.',
    duration: 2,
    price: 1000,
    courseId: '1'
  },
  {
    _id: '3',
    title: 'Class 1b',
    description: 'We do class-like things in this class.',
    duration: 2,
    price: 1000,
    courseId: '2'
  },
  {
    _id: '4',
    title: 'Class 2b',
    description: 'We do class-like things in this class.',
    duration: 2,
    price: 1000,
    courseId: '2'
  },
];

const facilitators = [
  {
    _id: '1',
    email: 'alphashuro@gmail.com',
    profile: {
      name: 'Alpha Shuro',
      phone: '073 790 7955',
      org: 'aepit'
    }
  },
  {
    _id: '2',
    email: 'afacilitator@aepit.co.za',
    profile: {
      name: 'Anoruda Surisipala',
      phone: '012 243 3425',
      org: 'aepit'
    }
  }
];

const bookings = [
  {
    _id: '1',
    courseId: '1',
    facilitatorId: '1',
    studentIds: [
      '1', '2'
    ],
    org: 'aepit'
  },
  {
    _id: '2',
    courseId: '2',
    facilitatorId: '2',
    studentIds: [
      '3', '4'
    ],
    org: 'aepit'
  },
  {
    _id: '3',
    courseId: '1',
    facilitatorId: '2',
    studentIds: [
      '1', '2', '3', '4'
    ],
    org: 'aepit'
  }
];
const sessions = [
  {
    _id: '1',
    bookingId: '1',
    classId: '1',
    date: new Date('February 13, 2016 08:00:00'),
  },
  {
    _id: '2',
    bookingId: '1',
    classId: '2',
    date: new Date('February 13, 2016 12:00:00'),
  },
  {
    _id: '3',
    bookingId: '2',
    classId: '3',
    date: new Date('February 16, 2016 08:00:00'),
  },
  {
    _id: '4',
    bookingId: '2',
    classId: '4',
    date: new Date('February 16, 2016 13:00:00'),
  },
  {
    _id: '5',
    bookingId: '3',
    classId: '1',
    date: new Date('February 17, 2016 12:00:00'),
  },
  {
    _id: '6',
    bookingId: '3',
    classId: '2',
    date: new Date('February 18, 2016 11:00:00'),
  },
];

export default function () {
  if (!Collections.Users.findOne()) {
    users.forEach(user => {
      const id = Accounts.createUser( user );
      Roles.addUsersToRole( id, user.profile.role );
    });
  }
  if (!Collections.Clients.findOne()) {
    clients.forEach(client => {
      Collections.Clients.insert( client );
    });
  }
  if (!Collections.Students.findOne()) {
    students.forEach(student => {
      Collections.Students.insert( student );
    });
  }
  if (!Collections.Courses.findOne()) {
    courses.forEach(course => {
      Collections.Courses.insert( course );
    });
  }
  if (!Collections.Classes.findOne()) {
    classes.forEach(c => {
      Collections.Classes.insert( c );
    });
  }
  if (!Collections.Users.findOne({roles: 'facilitator'})) {
    facilitators.forEach(facilitator => {
      const id = Accounts.createUser( facilitator );
      Roles.addUsersToRole(id, 'facilitator');
    });
  }
  if (!Collections.Bookings.findOne()) {
    bookings.forEach(booking => {
      Collections.Bookings.insert( booking );
    });
  }
  if (!Collections.Sessions.findOne()) {
    sessions.forEach(session => {
      Collections.Sessions.insert( session );
    });
  }
}
