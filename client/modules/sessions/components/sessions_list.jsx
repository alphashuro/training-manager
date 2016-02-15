import React from 'react';

import { ListGroup } from 'react-bootstrap';
import { Panel, PageHeader, Alert } from 'react-bootstrap';

import SessionsListItem from '../containers/sessions_list_item';

const SessionsList = ({sessionIds, error}) => (
  <Panel>
    <PageHeader>
      <span>Sessions</span>
    </PageHeader>
    { error ? <Alert>{error}</Alert> : null }
    <ListGroup>
      {
        sessionIds.map(id => (
         <SessionsListItem
          key={id}
          sessionId={id} />)
        )
      }
    </ListGroup>
  </Panel>
);

export default SessionsList;
