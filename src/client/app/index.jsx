import React from 'react';
import ReactDOM from 'react-dom';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {green500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Yggdrasil from './ygg.jsx';


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: green500,
  },
});

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Yggdrasil />
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
