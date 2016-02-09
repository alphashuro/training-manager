import React from 'react';
import Navigation from './navigation.jsx';

const Layout = ({content = () => null, user, logout}) => (
  <div>
    <Navigation user={user} onLogout={logout}/>
    <div>
      {content()}
    </div>
  </div>
  );

export default Layout;
