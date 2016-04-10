import React from 'react';

import { Panel, PageHeader, Row, Col } from 'react-bootstrap';

const Dashboard = ({}) => (
  <Panel>
    <PageHeader>
      Dashboard
    </PageHeader>
    <Row>
      <Col md={6}>
        <PageHeader>Coming up</PageHeader>
      </Col>
      <Col md={6}>
        <PageHeader>Stats this month</PageHeader>
      </Col>
    </Row>
  </Panel>
);

export default Dashboard;
