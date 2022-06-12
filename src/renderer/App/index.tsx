import 'reflect-metadata';
import React from 'react';
import { unstable_HistoryRouter as BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { useOnline } from '../hooks/useOnline';
import { NavigationService } from 'app/services/navigation';
import { StoresProvider } from 'app/store';
import { AppThemeProvider } from 'app/theme';
import { AppRouter } from 'app/routes/AppRouter';

export const App: React.FC = () => {
  useOnline();

  return (
    <>
      <CssBaseline />
      <StoresProvider>
        <AppThemeProvider>
          <BrowserRouter history={NavigationService.routerHistory}>
            <AppRouter />
          </BrowserRouter>
        </AppThemeProvider>
      </StoresProvider>
    </>
  );
};
