import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '../core/containers/main_layout';
import FacilitatorsList from './containers/facilitators_list';
import Facilitator from './containers/facilitator';
import NewFacilitator from './containers/new_facilitator';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/facilitators', {
    name: 'facilitators.list',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<FacilitatorsList />)
      });
    }
  });

  FlowRouter.route('/facilitators/:facilitatorId', {
    name: 'facilitators.single',
    action({facilitatorId}) {
      mount(MainLayoutCtx, {
        content: () => (<Facilitator facilitatorId={facilitatorId} />)
      });
    }
  });

  FlowRouter.route('/new-facilitator', {
    name: 'facilitators.new',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<NewFacilitator />)
      });
    }
  });
}
