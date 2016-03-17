import React, {PropTypes} from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import _ from 'underscore';

const Navigation = ({handleLogout, email, org, path}) => {
  /**
   * Returns the active key for the left nav buttons
   * '/' is in all paths so it will break the algorithm, so we test for it first and return quickly if it is the current path
   * otherwise we loop through all available high level paths and return their index if they are in the current path (index+1 because the actual first index is '/')
   * @return {int} the index of the path we are on
   */
  function getActiveKey() {
    if (path === '/') {
      return 0;
    }
    const paths = ['client', 'course', 'facilitator', 'booking'];
    return _(paths).findIndex(p => path.includes(p)) + 1;
  }
  return (
    <Navbar fixedTop>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">{org ? org : 'loading...'}</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav className='navigation' activeKey={ getActiveKey() }>
          <NavItem eventKey={0} href="/">Dashboard</NavItem>
          <NavItem eventKey={1} href="/clients">Clients</NavItem>
          <NavItem eventKey={2} href="/courses">Courses</NavItem>
          <NavItem eventKey={3} href="/facilitators">Facilitators</NavItem>
          <NavItem eventKey={4} href="/bookings">Bookings</NavItem>
        </Nav>

        <Nav pullRight>
          <NavDropdown eventKey={1} title={ email } id='nav-dropdown'>
            <MenuItem className='logout' eventKey={1.1} onClick={handleLogout}>
              Logout
            </MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

Navigation.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  email: PropTypes.string,
  org: PropTypes.string
};

export default Navigation;
