import { createStyles, Theme } from '@material-ui/core';

const style = (theme: Theme) =>
  createStyles({
    macHeader: {
      height: 28,
      '-webkit-app-region': 'drag', // Electron drag window
      background: theme.appColors.background.topHeader,
      color: theme.palette.text.primary,
      textAlign: 'center',
      fontSize: 14,
      fontWeight: 500,
      lineHeight: 1.5,
      borderBottom: `2px solid ${theme.palette.background.default}`,
    },
  });

export default style;
