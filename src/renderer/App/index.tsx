import 'reflect-metadata';
import React from 'react';
import { unstable_HistoryRouter as BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { NavigationService } from 'app/services/navigation';
import { ViewControllerProvider } from 'app/view-controllers';
import { AppThemeProvider } from 'app/theme';
import { AppRouter } from 'app/routes/AppRouter';

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
