import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const Navigation = ({onLogout, user}) => (
  <Navbar fixedTop>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">{user.profile.org}</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} href="/"> Dashboard </NavItem>
        <NavItem eventKey={2} href="/clients">Clients</NavItem>
        <NavItem eventKey={3} href="/courses">Courses</NavItem>
        <NavItem eventKey={4} href="/facilitators">Facilitators</NavItem>
        <NavItem eventKey={5} href="/bookings">Bookings</NavItem>
      </Nav>

      <Nav pullRight>
        <NavDropdown eventKey={1} title={ user.emails[0].address } id='nav-dropdown'>
          {/*<MenuItem divider />*/}
          <MenuItem eventKey={1.1} onClick={onLogout}>Logout</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Navigation;
