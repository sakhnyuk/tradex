import { createStyles, Theme } from '@material-ui/core';

import { scrollbarStyles } from '../../theme/scrollBar';

const style = (theme: Theme) =>
  createStyles({
    modal: {
      '-webkit-app-region': 'no-drag',
    },
    list: {
      height: '100%',
      overflowY: 'hidden',
      overflowX: 'hidden',
      padding: 0,
      outline: 'none',
      ...scrollbarStyles,
    },
    drawerPaper: {
      position: 'relative',
      width: 250,
      '-webkit-app-region': 'no-drag',
    },
    toolbar: {
      height: 72,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      paddingLeft: theme.appColors.spacingUnit,
      paddingRight: theme.appColors.spacingUnit,
      paddingBottom: 0,
      height: '100vh',
    },
    header: {
      textAlign: 'center',
      fontSize: '13px',
      padding: '0',
    },
    markets: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignContent: 'space-between',
      width: '100%',
      padding: '5px 0px',
    },
    buttonMarket: {
      padding: '3px 7px',
      margin: '3px',
      minWidth: '16.7%',
      minHeight: 20,
      fontSize: theme.typography.pxToRem(12),
    },
    disabledButtonMarket: {
      color: `${theme.appColors.active}!important`,
    },
    textField: {
      marginLeft: theme.appColors.spacingUnit * 2,
      marginRight: theme.appColors.spacingUnit * 2,
      width: 230,
    },
    menuItemContainer: {
      width: '100%',
      display: 'flex',
    },
    watchlistIcon: {
      width: 50,
      height: 50,
      '&:hover': {
        backgroundColor: 'transparent!important',
      },
    },
    iconSize: {
      fontSize: '18px!important',
    },
    menuItem: {
      paddingRight: '0px',
      paddingLeft: '10px',
      paddingBottom: '5px',
      paddingTop: '5px',
    },
    leftItem: {
      textAlign: 'right',
      paddingRight: '5',
      paddingLeft: '0',
    },
    percentage: {
      color: 'rgb(102, 204, 98)',
      textAlign: 'right',
      paddingRight: '0',
      paddingLeft: '0',
      fontSize: '12px',
    },
    percentageRed: {
      color: 'rgb(233, 90, 90)',
      textAlign: 'right',
      paddingRight: '0',
      paddingLeft: '0',
      fontSize: '12px',
    },
    price: {
      fontSize: '11px',
    },
    primary: {
      fontSize: '14px',
    },
    showOff: {
      padding: '0',
      textAlign: 'center',
    },
    exchange: {
      fontSize: 16,
    },
    noPair: {
      marginLeft: theme.appColors.spacingUnit * 2,
      marginTop: theme.appColors.spacingUnit,
    },
    sortHeader: {
      height: '24px',
      paddingLeft: theme.appColors.spacingUnit,
      paddingRight: theme.appColors.spacingUnit,
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    cell: {
      whiteSpace: 'nowrap',
      color: theme.appColors.fontTableColor,
      padding: '2px 5px',
      display: 'block',
      minWidth: '20%',
      maxWidth: '20%',
      textAlign: 'left',
      fontSize: 12,
      cursor: 'pointer',
      '&:nth-child(2)': {
        paddingLeft: '12px',
      },
      '& span': {
        fontSize: 10,
      },
    },
  });

export default style;
