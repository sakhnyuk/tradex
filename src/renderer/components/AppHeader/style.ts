import { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
    boxShadow:
      '0px 0px 0px 0px rgba(0,0,0,0.2), 6px 1px 1px 1px rgba(0, 0, 0, 0.04), 0px 3px 1px -2px rgba(0,0,0,0.12)',
  },

  pairButton: {
    borderLeft: (theme) => `2px solid ${theme.appColors.borderButton}`,
    height: '48px',

    borderRadius: 0,
    boxSizing: 'border-box',
    position: 'relative',
    lineHeight: 1,
    padding: '4px 36px',
    minWidth: 'auto',
    whiteSpace: 'nowrap',
    '-webkit-app-region': 'no-drag',
  },

  borderRight: {
    borderRight: (theme) => `1px solid ${theme.appColors.borderButton}`,
  },
  accountName: {
    position: 'absolute',
    right: 12,
    bottom: 4,
    color: '#aaa',
    fontSize: 10,
  },

  hidden: {
    visibility: 'hidden',
  },
  appBar: {
    zIndex: 'auto',
    WebkitAppRegion: 'no-drag', // Electron drag window
    width: '100%',
    backgroundColor: 'background.paper',
    color: 'text.primary',
    transition: (theme) =>
      theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
  },
  toolbarHeader: {
    minHeight: '48px',
  },
  title: {
    width: 200,
  },
  tickerInfo: {
    paddingLeft: '80px',
    color: 'text.primary',
  },
  tickerTitle: {
    textAlign: 'center',
    fontSize: '22px',
    color: 'text.primary',
  },
  item: {
    padding: '0',
    paddingLeft: '16px',
    color: 'text.primary',
  },
  itemTitle: {
    textAlign: 'left',
    fontSize: '12px',
    padding: '0',
    color: 'text.primary',
  },
  itemWhite: {
    textAlign: 'left',
    fontSize: '14px',
    padding: '0',
    color: 'text.primary',
  },
  itemMultiline: {
    marginBottom: '4px',
    marginTop: '4px',
  },
  itemRed: {
    textAlign: 'left',
    fontSize: '14px',
    padding: '0',
    color: 'rgb(233, 90, 90)',
  },
  itemGreen: {
    textAlign: 'left',
    fontSize: '14px',
    padding: '0',
    color: 'rgb(102, 204, 98)',
  },
  button: {
    textDecoration: 'none',
    textDecorationColor: 'white',
    color: 'white',
    WebkitAppRegion: 'no-drag',
  },
  menuButton: {
    color: (theme) => theme.appColors.iconButton,
    borderRadius: 0,
    WebkitAppRegion: 'no-drag',
  },
  hide: {
    display: 'none',
  },
  zIndex: {
    zIndex: 228322,
  },
  layoutIcon: {
    WebkitAppRegion: 'no-drag',
    marginRight: 0,
    color: 'text.primary',
  },
  menuItem: {
    WebkitAppRegion: 'no-drag',
    minWidth: 8,
    fontSize: 14,
  },
  menuScale: {
    transform: 'scale(.88)!important',
  },
  menuIcon: {
    WebkitAppRegion: 'no-drag',
    marginRight: 0,
  },
};
