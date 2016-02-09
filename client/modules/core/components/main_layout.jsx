import React from 'react';
import Navigation from './navigation.jsx';

import { Grid } from 'react-bootstrap';

const Layout = ({content = () => null, user, logout}) => (
  <div>
    <Navigation user={user} onLogout={logout}/>
    <Grid>
      {content()}
    </Grid>
  </div>
  );

export default Layout;
