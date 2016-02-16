import actions from './actions';
import routes from './routes.jsx';
import methodStubs from './configs/method_stubs';
import enrollmentConfig from './configs/enrollment';

export default {
  actions,
  routes,
  load(context) {
    enrollmentConfig(context);
    methodStubs(context);
  }
};
