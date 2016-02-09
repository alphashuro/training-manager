import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from './containers/main_layout';
import Dashboard from './containers/dashboard';
import Login from './containers/login';
import Signup from './containers/signup';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/', {
    name: 'dashboard',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Dashboard />)
      });
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
