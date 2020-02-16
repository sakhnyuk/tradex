import { createStyles, Theme } from '@material-ui/core';

const style = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '1fr 1fr',
      backgroundColor: theme.palette.background.default,
    },

    default: {
      gridColumn: '1/3',
      gridRow: '1/3',
    },

    top: {
      gridColumn: '1/3',
      gridRow: '1/2',
      marginBottom: theme.appColors.spacingUnit,
    },
    bot: {
      gridColumn: '1/3',
      gridRow: '2/3',
      marginBottom: 0,
    },

    left: {
      gridColumn: '1/2',
      gridRow: '1/3',
      marginRight: theme.appColors.spacingUnit,
    },

    right: {
      gridColumn: '2/3',
      gridRow: '1/3',
      marginRight: 0,
    },

    topleft: {
      gridColumn: '1/2',
      gridRow: '1/2',
      marginRight: theme.appColors.spacingUnit,
      marginBottom: theme.appColors.spacingUnit,
    },
    topright: {
      gridColumn: '2/3',
      gridRow: '1/2',
      marginBottom: theme.appColors.spacingUnit,
    },
    botleft: {
      gridColumn: '1/2',
      gridRow: '2/3',
      marginRight: theme.appColors.spacingUnit,
    },
    botright: {
      gridColumn: '2/3',
      gridRow: '2/3',
    },
  });

export default style;
