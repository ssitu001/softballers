import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';


class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
     <MuiThemeProvider> 
      <div>      
        <h1>Softballers</h1>
        <RaisedButton label="Default" />
      </div>
     </MuiThemeProvider> 
    )
  }
}

export default App;
