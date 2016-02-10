import React from 'react';
import Navigation from './navigation.jsx';

import { Grid } from 'react-bootstrap';

const Layout = ({content = () => null, user, logout, path}) => (
  <div>
    <Navigation user={user} onLogout={logout} path={path} />
    <Grid style={{ marginTop: '50px' }}>
      {content()}
    </Grid>
  </div>
  );

export default Layout;
