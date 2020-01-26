import { createStyles, Theme } from '@material-ui/core';

const buttonStyles = createStyles({
  basic: {
    gridRow: '1 / span 1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',

    userSelect: 'none',
    cursor: 'default',
    opacity: 0.8,

    '-webkit-app-region': 'no-drag',
    '&:hover': { background: 'rgba(255,255,255,0.2)', opacity: 1 },
  },
});

const style = (theme: Theme) =>
  createStyles({
    titlebar: {
      '-webkit-app-region': 'drag',
      height: 32,
      background: theme.appColors.background.topHeader,
      color: theme.appColors.text.reverse,
      position: 'relative',
      borderBottom: `2px solid ${theme.palette.background.default}`,
    },
    windowTitle: {
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      left: theme.appColors.spacingUnit * 2,
      height: 32,
      margin: theme.appColors.spacingUnit,
      fontSize: 14,
      lineHeight: 1.5,
      overflowX: 'hidden',
    },
    windowControls: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 46px)',
      position: 'absolute',
      top: 0,
      right: 0,
      height: '32px',
      fontFamily: 'Segoe MDL2 Assets',
      fontSize: 10,
    },

    minButton: {
      gridColumn: 1,
      ...buttonStyles.basic,
    },
    centerButton: {
      gridColumn: 2,
      ...buttonStyles.basic,
    },
    closeButton: {
      gridColumn: 3,
      ...buttonStyles.basic,
      '&:hover': { backgroundColor: '#E81123' },
    },
  });

export default style;
