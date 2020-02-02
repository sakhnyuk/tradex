import { createStyles, Theme } from '@material-ui/core';

const style = (theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      width: 64,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      flexDirection: 'column',
      background: theme.palette.background.paper,
      color: theme.palette.text.primary,
    },

    active: {
      color: theme.appColors.active,
    },

    menuButton: {
      width: 64,
      maxWidth: 64,
      minWidth: 64,
      minHeight: 64,
      maxHeight: 64,
      height: 64,

      '&:hover': {
        background: theme.appColors.hover,
      },
    },
  });

export default style;
