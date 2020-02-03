import { createStyles, Theme } from '@material-ui/core';

const style = (theme: Theme) =>
  createStyles({
    main: {
      height: '100%',
      overflow: 'hidden',
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100% - 50px)',
      width: '100%',
    },
    header: {
      height: '25px',
    },
    head: {
      height: '21px',
    },
    titleHeader: {
      color: theme.appColors.fontTableColor,
      padding: '0 20px',
      fontSize: 11,
      fontWeight: 400,
    },
    table: {
      minWidth: '150px',
      height: '100%',
    },
    askSide: {
      color: theme.appColors.red,
      padding: '2px 5px 2px 10px',
      textAlign: 'left',
      width: 'auto',
      fontSize: 11,
    },
    bidSide: {
      color: theme.appColors.green,
      padding: '2px 5px 2px 10px',
      textAlign: 'left',
      width: 'auto',
      fontSize: 11,
    },
    backgroundRowRed: {
      backgroundColor: 'rgba(233, 90, 90, 0.2) !important',
    },
    backgroundRowGreen: {
      backgroundColor: 'rgba(102, 204, 98, 0.2) !important',
    },
    backgroundRowRed2: {
      // backgroundColor: 'rgba(233, 90, 90, 0.07) !important',
    },
    backgroundRowGreen2: {
      // backgroundColor: 'rgba(102, 204, 98, 0.07) !important',
    },
    row: {
      display: 'flex',
      justifyContent: 'space-between',
      height: 'auto',
      '&&:hover': {
        fontWeight: 600,
        cursor: 'pointer',
      },
    },

    askArea: {
      width: '100%',
      height: 'calc(50% - 20px)',
      overflowY: 'hidden',
      overflowX: 'hidden',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      outline: 'none',
    },

    bidArea: {
      height: 'calc(50% - 20px)',
      width: '100%',
      overflowY: 'hidden',
      overflowX: 'hidden',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      outline: 'none',
    },
    centralInfoPanel: {
      height: 40,
      margin: 0,
      padding: 0,
      display: 'grid',
      gridTemplateColumns: '1fr 2fr',
      gridTemplateRows: '1fr 1fr',
      gridTemplateAreas: `"price baseTotal"
    "price quoteTotal"`,
    },
    price: {
      padding: 0,
      margin: 0,
      gridArea: 'price',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    priceComp: {
      fontWeight: 500,
    },
    red: {
      color: theme.appColors.red,
    },
    green: {
      color: theme.appColors.green,
    },
    baseTotal: {
      gridArea: 'baseTotal',
      fontSize: 11,
      color: theme.appColors.fontTableColor,
    },
    quoteTotal: {
      gridArea: 'quoteTotal',
      fontSize: 11,
      color: theme.appColors.fontTableColor,
    },

    cellHeader: {
      color: theme.appColors.fontTableColor,
      height: '100%',
      fontSize: 11,
      fontWeight: 400,
    },
    cell: {
      padding: '2px 5px',
      textAlign: 'center',
      color: theme.appColors.fontTableColor,
      fontSize: 11,
    },
  });

export default style;
