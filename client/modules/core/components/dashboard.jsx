import React from 'react';

import {
  Panel,
  PageHeader,
  Row,
  Col
} from 'react-bootstrap';

class Dashboard extends React.Component {
  render() {
    return (
      <Panel>
        <PageHeader>
          Dashboard
        </PageHeader>
        <Row>
          <Col md={6}>

          </Col>
          <Col md={6}>

          </Col>
        </Row>
      </Panel>
    );
  }
}

export default Dashboard;
