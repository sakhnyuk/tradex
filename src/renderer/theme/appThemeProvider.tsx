import React from 'react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { createMuiTheme } from 'app/theme';
import { useStores } from 'app/store';

type Props = {
  children: React.ReactNode;
};

export const AppThemeProvider: React.FC<Props> = ({ children }) => {
  const { core } = useStores();
  const theme = createMuiTheme(core.theme);

  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>
    </ThemeProvider>
  );
};
