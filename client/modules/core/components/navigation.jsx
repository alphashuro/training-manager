import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const Navigation = ({onLogout, user, path}) => {
  function getActiveKey() {
    if (path === '/') {
      return 0;
    }

    const paths = [ 'client', 'course', 'facilitator', 'booking' ];

    for (let p of paths) {
      if ( path.includes(p) ) {
        return paths.indexOf(p) + 1;
      }
    }
  }

  return (
    <Navbar fixedTop>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">{user.profile.org}</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav activeKey={ getActiveKey() }>
          <NavItem eventKey={0} href="/"> Dashboard </NavItem>
          <NavItem eventKey={1} href="/clients">Clients</NavItem>
          <NavItem eventKey={2} href="/courses">Courses</NavItem>
          <NavItem eventKey={3} href="/facilitators">Facilitators</NavItem>
          <NavItem eventKey={4} href="/bookings">Bookings</NavItem>
        </Nav>

        <Nav pullRight>
          <NavDropdown eventKey={1} title={ user.emails[0].address } id='nav-dropdown'>
            <MenuItem eventKey={1.1} onClick={onLogout}>Logout</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
