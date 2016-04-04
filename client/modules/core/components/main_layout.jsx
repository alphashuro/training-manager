import React, {PropTypes} from 'react';
import Navigation from '../containers/navigation';

import { Grid } from 'react-bootstrap';

const Layout = ({content = () => null}) => (
  <div>
    <Navigation />
    <Grid style={{ marginTop: '50px' }}>
      {content()}
    </Grid>
  </div>
);

Layout.propTypes = {
  content: PropTypes.any,
};

export default Layout;
