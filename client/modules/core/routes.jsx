import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from './containers/main_layout';
import Dashboard from './containers/dashboard';


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
}
