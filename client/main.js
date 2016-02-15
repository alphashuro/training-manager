import {createApp} from 'mantra-core';
import initContext from './configs/context';

// modules
import coreModule from './modules/core';
import usersModule from './modules/users';

import clientsModule from './modules/clients';
import studentsModule from './modules/students';

import facilitatorsModule from './modules/facilitators';

import coursesModule from './modules/courses';
import classesModule from './modules/classes';

import bookingsModule from './modules/bookings';
import sessionsModule from './modules/sessions';

// init context
const context = initContext();

// create app
const app = createApp(context);

app.loadModule(coreModule);
app.loadModule(usersModule);

app.loadModule(clientsModule);
app.loadModule(studentsModule);

app.loadModule(facilitatorsModule);

app.loadModule(coursesModule);
app.loadModule(classesModule);

app.loadModule(bookingsModule);
app.loadModule(sessionsModule);

app.init();
