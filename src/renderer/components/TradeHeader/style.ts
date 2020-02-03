import { createStyles, Theme } from '@material-ui/core';

const style = (theme: Theme) =>
  createStyles({
    headerContainer: {
      display: 'flex',
      flexDirection: 'column',
      boxShadow:
        '0px 0px 0px 0px rgba(0,0,0,0.2), 6px 1px 1px 1px rgba(0, 0, 0, 0.04), 0px 3px 1px -2px rgba(0,0,0,0.12)',
    },
    pairButton: {
      borderLeft: `2px solid ${theme.appColors.borderButton}`,
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
      borderRight: `1px solid ${theme.appColors.borderButton}`,
    },
    accountName: {
      position: 'absolute',
      right: theme.appColors.spacingUnit * 3,
      bottom: 4,
      color: '#aaa',
      fontSize: 10,
    },

    hidden: {
      visibility: 'hidden',
    },
    appBar: {
      zIndex: 'auto',
      '-webkit-app-region': 'no-drag', // Electron drag window
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    toolbarHeader: {
      minHeight: '48px',
    },
    macToolbarHeader: {
      minHeight: '48px',
    },
    title: {
      width: 200,
    },
    tickerInfo: {
      paddingLeft: '80px',
      color: theme.palette.text.primary,
    },
    tickerTitle: {
      textAlign: 'center',
      fontSize: '22px',
      color: theme.palette.text.primary,
    },
    item: {
      padding: '0',
      paddingLeft: '16px',
      color: theme.palette.text.primary,
    },
    itemTitle: {
      textAlign: 'left',
      fontSize: '12px',
      padding: '0',
      color: theme.palette.text.primary,
    },
    itemWhite: {
      textAlign: 'left',
      fontSize: '14px',
      padding: '0',
      color: theme.palette.text.primary,
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
      '-webkit-app-region': 'no-drag',
    },
    menuButton: {
      color: theme.appColors.iconButton,
      borderRadius: 0,
      '-webkit-app-region': 'no-drag',
    },
    hide: {
      display: 'none',
    },
    zIndex: {
      zIndex: 228322,
    },
    layoutIcon: {
      '-webkit-app-region': 'no-drag',
      marginRight: 0,
      color: theme.palette.text.primary,
    },
    menuItem: {
      '-webkit-app-region': 'no-drag',
      minWidth: 8,
      fontSize: 14,
    },
    menuScale: {
      transform: 'scale(.88)!important',
    },
    menuIcon: {
      '-webkit-app-region': 'no-drag',
      marginRight: 0,
    },
  });

export default style;
