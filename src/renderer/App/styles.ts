import { Theme, createStyles } from '@material-ui/core/styles';

const style = (theme: Theme) =>
  createStyles({
    '@global': {
      body: {
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        fontFamily: " 'Roboto', sans-serif",
        '-webkit-user-select': 'none',
      },

      ol: {
        listStyle: 'none outside none',
      },
      ul: {
        listStyle: 'none outside none',
      },
      li: {
        listStyle: 'none',
      },
    },

    root: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexDirection: 'column',
      overflow: 'hidden',
      width: '100vw',
      height: '100vh',
    },

    container: {
      flex: 1,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      flexDirection: 'row',
    },

    leftMenu: {
      height: '100%',
      width: 64,
      background: theme.palette.background.paper,
    },
  });

export default style;
