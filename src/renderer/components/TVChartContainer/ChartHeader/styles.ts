import { createStyles, Theme } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContenr: 'space-between',
      alignItems: 'center',
    },
    chartHeaderLeft: {
      width: '50%',
      height: 20,
      paddingLeft: theme.appColors.spacingUnit,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    chartHeaderRight: {
      width: '50%',
      height: 20,
      paddingRight: theme.appColors.spacingUnit,
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    menuButton: {
      fontSize: '0.875rem',
      cursor: 'pointer',
      color: theme.palette.text.primary,
      fontWeight: 400,
      marginRight: 8,
      whiteSpace: 'nowrap',
      '& :nth-last-child': {
        marginLeft: theme.appColors.spacingUnit,
      },
    },
    arrowBottom: {
      marginLeft: theme.appColors.spacingUnit,
      fontSize: 8,
    },
    menuItem: {
      height: 20,
      fontSize: 14,
    },
    active: {
      color: theme.appColors.active,
    },
    icon: {
      width: 20,
      height: 20,
      padding: 0,
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    iconLabel: {
      color: theme.palette.secondary.main,
      height: 20,
      width: 20,
      '& :hover': {
        backgroundColor: 'transparent',
      },
    },
    fontSize: {
      fontSize: 19,
    },
    divider: {
      color: theme.palette.text.primary,
    },
  });

export default styles;
