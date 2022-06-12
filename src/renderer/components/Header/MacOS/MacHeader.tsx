import React from 'react';
import Box from '@mui/material/Box';

export const MacHeader = () => {
  return (
    <Box
      sx={{
        height: 28,
        WebkitAppRegion: 'drag', // Electron drag window
        background: (theme) => theme.appColors.background.topHeader,
        color: 'text.primary',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 1.5,
      }}
    />
  );
};
