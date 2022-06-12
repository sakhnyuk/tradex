import { Button, styled, Theme, ButtonProps } from '@mui/material';

export const HeadButton = styled(Button)((theme: Theme) => ({
  borderLeft: `2px solid ${theme.appColors.borderButton}`,
  height: '48px',
  borderRadius: 0,
  boxSizing: 'border-box',
  position: 'relative',
  lineHeight: 1,
  padding: '4px 36px',
  minWidth: 'auto',
  whiteSpace: 'nowrap',
  WebkitAppRegion: 'no-drag',
}));
