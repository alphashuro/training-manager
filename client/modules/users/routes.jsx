// import React from 'react';
import {mount} from 'react-mounter';

import Enroll from './containers/enroll';
import Login from './containers/login';
import Signup from './containers/signup';

export default function (injectDeps, {FlowRouter}) {
  const EnrollCtx = injectDeps(Enroll);
  FlowRouter.route('/enroll-account/:token', {
    name: 'users.enroll',
    action(params) {
      mount(EnrollCtx, { ...params });
    }
  });

  const LoginCtx = injectDeps(Login);
  FlowRouter.route('/login', {
    name: 'login',
    action() {
      mount(LoginCtx);
    }
  });

  const SignupCtx = injectDeps(Signup);
  FlowRouter.route('/signup', {
    name: 'signup',
    action() {
      mount(SignupCtx);
    }
  });
}
