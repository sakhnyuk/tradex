import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router';
import { useSelector } from 'react-redux';

import { useOnline } from '../hooks/useOnline';
import { createTheme } from '../theme/createTheme';
import { history } from '../store/configureStore';
import { selectCore } from '../store/core';
import { AppLayout } from './AppLayout';

export const App: React.FC = () => {
  useOnline()
  const theme = useSelector(selectCore.theme);

  return (
    <MuiThemeProvider theme={createTheme(theme)}>
      <ConnectedRouter history={history}>
        <AppLayout />
      </ConnectedRouter>
    </MuiThemeProvider>
  );
};
