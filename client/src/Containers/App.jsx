import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//Components
import NavBar from '../Components/Nav.jsx';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
     <MuiThemeProvider> 
      <div>      
        <NavBar />
      </div>
     </MuiThemeProvider> 
    )
  }
}

export default App;
