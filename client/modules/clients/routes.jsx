import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '../core/containers/main_layout';
import ClientsList from './containers/clients_list';
import Client from './containers/client';
import NewClient from './containers/new_client';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/clients', {
    name: 'clients.list',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<ClientsList />)
      });
    }
  });

  FlowRouter.route('/clients/:clientId', {
    name: 'clients.single',
    action({clientId}) {
      mount(MainLayoutCtx, {
        content: () => (<Client clientId={clientId} />)
      });
    }
  });

  FlowRouter.route('/new-client', {
    name: 'clients.new',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<NewClient />)
      });
    }
  });
}
