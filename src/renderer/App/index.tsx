import 'reflect-metadata';
import React from 'react';
import { unstable_HistoryRouter as BrowserRouter } from 'react-router-dom';

import { useOnline } from '../hooks/useOnline';

import { NavigationService } from 'app/services/navigation';
import { StoresProvider } from 'app/store';
import { AppThemeProvider } from 'app/theme';
import { AppRouter } from 'app/routes/AppRouter';

export const App: React.FC = () => {
  useOnline();

  return (
    <StoresProvider>
      <AppThemeProvider>
        <BrowserRouter history={NavigationService.routerHistory}>
          <AppRouter />
        </BrowserRouter>
      </AppThemeProvider>
    </StoresProvider>
  );
};
