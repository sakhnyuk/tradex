import React from 'react';
import { MuiThemeProvider, makeStyles } from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router';
// import { Switch, Route, Redirect } from 'react-router-dom';

import { createTheme } from '../theme/createTheme';
import { history } from '../store/configureStore';
import styles from './styles';
import MacHeader from '../components/Header/Mac';
// import { isMac } from '../appConstant';

const useStyles = makeStyles(styles);

export const App: React.FC = () => {
  const theme = 'dark';
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={createTheme(theme)}>
      <ConnectedRouter history={history}>
        <div className={classes.root}>
          <MacHeader />
          {/* {isMac ? <MacHeader /> : <WinHeader />} */}
          <div className={classes.container}>
            <div className={classes.leftMenu}>{/* <LeftMenu /> */}</div>
            {/* <Switch>
              <Route exact path="/" component={Analysis} />
              <Route path="/settings" component={Settings} />
            </Switch> */}
          </div>
        </div>
      </ConnectedRouter>
    </MuiThemeProvider>
  );
};
