import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createMuiTheme } from 'app/theme';
import { useStores } from 'app/store';

type Props = {
  children: React.ReactNode;
};

export const AppThemeProvider: React.FC<Props> = ({ children }) => {
  const { core } = useStores();

  return <ThemeProvider theme={createMuiTheme(core.theme)}>{children}</ThemeProvider>;
};
