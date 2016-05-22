import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Yggdrasil from './ygg.jsx';

const App = () => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Yggdrasil />
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
