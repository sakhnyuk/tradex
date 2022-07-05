import React from 'react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { createMuiTheme } from 'theme';
import { useViewControllers } from 'view-controllers';

type Props = {
  children: React.ReactNode;
};

export const AppThemeProvider: React.FC<Props> = ({ children }) => {
  const { core } = useViewControllers();
  const theme = createMuiTheme(core.theme);

  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>
    </ThemeProvider>
  );
};
