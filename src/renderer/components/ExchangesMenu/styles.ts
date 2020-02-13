import { createStyles, Theme } from '@material-ui/core';
import { scrollbarStyles } from '../../theme/scrollBar';

const styles = (theme: Theme) =>
  createStyles({
    dialog: {
      width: 400,
      height: 380,
      ...scrollbarStyles,
      overflowY: 'auto',
      overflowX: 'hidden',
    },
    listItem: {
      width: 280,
      overflowX: 'hidden',
    },
    label: {
      '&:hover': {
        color: theme.palette.secondary.main,
      },
    },
    selectedLabel: {
      color: `${theme.palette.secondary.main}!important`,
    },
    overflowHidden: {
      overflow: 'hidden',
    },
    formContainer: {
      padding: theme.appColors.spacingUnit * 3,
    },
    form: {
      paddingTop: theme.appColors.spacingUnit,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    input: {
      fontSize: 14,
      margin: theme.appColors.spacingUnit,
    },
    buttonsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    button: {
      width: 120,
      margin: theme.appColors.spacingUnit,
    },
    addAccountButton: {
      position: 'absolute',
      bottom: theme.appColors.spacingUnit * 3,
      right: theme.appColors.spacingUnit * 3,
      backgroundColor: theme.appColors.exchangeButtonColor,
      '&:hover': {
        backgroundColor: theme.appColors.exchangeButtonHoverColor,
      },
    },
    fullWidth: {
      width: '100%',
    },
  });

export default styles;
