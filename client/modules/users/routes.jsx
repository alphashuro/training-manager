import React from 'react';
import {mount} from 'react-mounter';

import Enroll from './containers/enroll';
import Login from './containers/login';
import Signup from './containers/signup';

import MainLayout from '../core/containers/main_layout';

import UsersList from './containers/users_list';
import User from './containers/user';
import NewUser from './containers/new_user';

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

  const MainLayoutCtx = injectDeps(MainLayout);
  FlowRouter.route('/users', {
    name: 'users.list',
    action() {
      mount(MainLayoutCtx, { content: () => <UsersList/> })
    }
  });

  FlowRouter.route('/users/:userId', {
    name: 'users.single',
    action({userId}) {
      mount(MainLayoutCtx, {
        content: () => (<User userId={userId}/>)
      });
    }
  });

  FlowRouter.route('/new-user', {
    name: 'users.new',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<NewUser />)
      })
    }
  })
}
