import React, { PropTypes } from 'react';
import EmptyRow from '../../util/components/EmptyRow.jsx';
import { Panel, PageHeader, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';

const Dashboard = ({ sessionsComingUp, statsThisMonth }) => (
  <Panel>
    <Row>
      <Col md={6}>
        <PageHeader>Coming up</PageHeader>
        <ListGroup>
        {
          sessionsComingUp.length ? null : 'No sessions coming up this month.'
        }
        </ListGroup>
      </Col>
      <Col md={6}>
        <PageHeader>Stats this month</PageHeader>
        <ListGroup>
          {
            statsThisMonth.length ? null : 'No data this month.'
          }
        </ListGroup>
      </Col>
    </Row>
  </Panel>
);

Dashboard.propTypes = {
  sessionsComingUp: PropTypes.array.isRequired,
  statsThisMonth: PropTypes.array.isRequired
}

export default Dashboard;
