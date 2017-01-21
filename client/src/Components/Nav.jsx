import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';

const NavBar = () => (
  <AppBar
    title="Softballers"
    iconElementRight={<FlatButton label="Contact" />}

  />
);

export default NavBar;