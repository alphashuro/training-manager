import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const Navigation = ({onLogout, user}) => (
  <Navbar fixedTop>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">{user.profile.org}</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav bsStyle='tabs' activeKey={1}>
      <NavItem eventKey={1} href="/"> Dashboard </NavItem>
      <NavItem eventKey={2} href="/clients">Clients</NavItem>
      <NavItem eventKey={3} href="/courses">Courses</NavItem>
      <NavItem eventKey={4} href="/facilitators">Facilitators</NavItem>
      <NavItem eventKey={5} href="/bookings">Bookings</NavItem>
    </Nav>

      <Nav pullRight={true}>
        <NavDropdown eventKey={1} title={ user.emails[0].address } id='nav-dropdown'>
          <MenuItem eventKey={1.1} onClick={onLogout}>Logout</MenuItem>
        </NavDropdown>
      </Nav>
  </Navbar>
);

export default Navigation;
