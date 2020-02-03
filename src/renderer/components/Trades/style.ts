import { createStyles, Theme } from '@material-ui/core';

const style = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    },
    header: {
      height: '25px',
    },

    head: {
      height: '25px',
    },

    table: {
      overflowY: 'scroll',
      overflowX: 'hidden',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      outline: 'none',
    },

    tableTrades: {
      flexGrow: 1,
      height: 'calc(100% - 30px)',
      width: '100%',
    },

    titleHeader: {
      color: theme.appColors.fontTableColor,
      padding: '0 20px',
      fontSize: 11,
      fontWeight: 400,
    },

    cellHeader: {
      color: theme.appColors.fontTableColor,
      height: '100%',
      fontSize: 11,
      fontWeight: 400,
    },
    priceSell: {
      color: theme.appColors.red,
      padding: '2px 5px 2px 10px',
      fontSize: 11,
    },
    priceBuy: {
      color: theme.appColors.green,
      padding: '2px 5px 2px 10px',
      fontSize: 11,
    },
    row: {
      height: 'auto',
      width: 'auto',
      padding: '0px',
      display: 'flex',
      justifyContent: 'space-between',
      '&&:hover': {
        fontWeight: 600,
        cursor: 'pointer',
      },
    },
    cell: {
      padding: '2px 5px',
      textAlign: 'center',
      color: theme.appColors.fontTableColor,
      fontSize: 11,
    },
  });

export default style;
