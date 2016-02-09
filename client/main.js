import {createApp} from 'mantra-core';
import initContext from './configs/context';

// modules
import coreModule from './modules/core';
import clientsModule from './modules/clients';
import facilitatorsModule from './modules/facilitators';
// import coursesModule from './modules/courses';
// import bookingsModule from './modules/bookings';

// init context
const context = initContext();

// create app
const app = createApp(context);
app.loadModule(coreModule);
app.loadModule(clientsModule);
app.loadModule(facilitatorsModule);
// app.loadModule(coursesModule);
// app.loadModule(bookingsModule);

app.init();
