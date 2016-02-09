import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const Navigation = ({onLogout, user}) => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        {user.profile.org}
      </Navbar.Brand>
    </Navbar.Header>
    <Nav bsStyle='tabs' activeKey={1}>
      <NavItem eventKey={1} href="/"> Dashboard </NavItem>
      <NavItem eventKey={2} href="/clients">Clients</NavItem>
      <NavItem eventKey={3} href="/courses">Courses</NavItem>
      <NavItem eventKey={4} href="/facilitators">Facilitators</NavItem>
      <NavItem eventKey={5} href="/bookings">Bookings</NavItem>
      <NavItem onClick={onLogout}>Logout</NavItem>
    </Nav>
  </Navbar>
);

export default Navigation;
