import { createStyles, Theme } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      height: 'calc(100% - 20px)',
      backgroundColor: theme.palette.background.default,
      border: 0,
      '-webkit-app-region': 'no-drag',
    },
  });

export default styles;
