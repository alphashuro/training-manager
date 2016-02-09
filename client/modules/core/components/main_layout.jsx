import React from 'react';
import Navigation from './navigation.jsx';

const Layout = ({content = () => null, user}) => (
  <div>
    <Navigation user={user}/>
    <div>
      {content()}
    </div>
  </div>
  );

export default Layout;
