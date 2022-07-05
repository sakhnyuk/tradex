import React from 'react';
import { unstable_HistoryRouter as BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ViewControllerProvider } from 'view-controllers';
import { AppThemeProvider } from 'theme';
import { NavigationService } from 'services/navigation';
import { AppRouter } from './AppRouter';

export const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <ViewControllerProvider>
        <AppThemeProvider>
          <BrowserRouter history={NavigationService.routerHistory}>
            <AppRouter />
          </BrowserRouter>
        </AppThemeProvider>
      </ViewControllerProvider>
    </>
  );
};
