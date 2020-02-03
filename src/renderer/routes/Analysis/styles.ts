import { createStyles, Theme } from '@material-ui/core';

const style = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
      display: 'grid',
      gridTemplateColumns: '1fr 320px',
      gridTemplateRows: '48px 1fr 250px',
      backgroundColor: theme.palette.background.default,
    },

    header: {
      gridColumn: '1/3',
      gridRow: '1/2',
      marginBottom: theme.appColors.spacingUnit,
    },

    chartFullPage: {
      gridColumn: '1/2',
      gridRow: '2/4',
      margin: theme.appColors.spacingUnit,
    },

    orderBook: {
      gridColumn: '2/3',
      gridRow: '2/3',
      marginBottom: theme.appColors.spacingUnit,
      marginTop: theme.appColors.spacingUnit,
      marginRight: theme.appColors.spacingUnit,
    },
    trades: {
      gridColumn: '2/3',
      gridRow: '3/4',
      marginBottom: theme.appColors.spacingUnit,
      marginRight: theme.appColors.spacingUnit,
    },
  });

export default style;
