import React from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';

import LeftMenu from '../components/LeftMenu';
import { MacHeader } from 'app/components/Header';

export const AppLayout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        overflow: 'hidden',
        width: '100vw',
        height: '100vh',
      }}
    >
      <MacHeader />

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          flexDirection: 'row',
        }}
      >
        <Box
          sx={{
            height: '100%',
            width: 64,
            background: 'background.paper',
          }}
        >
          <LeftMenu />
        </Box>

        <Outlet />
      </Box>
    </Box>
  );
};
