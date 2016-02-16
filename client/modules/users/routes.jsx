import React from 'react';
import {mount} from 'react-mounter';

import Enroll from './containers/enroll';

export default function (injectDeps, {FlowRouter}) {
  const EnrollCtx = injectDeps(Enroll);
  FlowRouter.route('/enroll-account/:token', {
    name: 'users.enroll',
    action(params) {
      mount(EnrollCtx, { ...params });
    }
  });
}
