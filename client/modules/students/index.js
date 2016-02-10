import actions from './actions';
import methodStubs from './configs/method_stubs';

export default {
  actions,
  load(context) {
    methodStubs(context);
  }
}
