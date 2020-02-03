import React, { useEffect } from 'react';
import { MuiThemeProvider, makeStyles } from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ipcRenderer } from 'electron';
import { createTheme } from '../theme/createTheme';
import { history } from '../store/configureStore';

import MacHeader from '../components/Header/MacOS';
import WinHeader from '../components/Header/Windows';
import { isMac } from '../appConstant';
import LeftMenu from '../components/LeftMenu';
import Analysis from '../components/Analysis';
import { selectCore } from '../store/core/selectors';
import { useCoreActions } from '../store/core/useCoreActions';

import styles from './styles';

const useStyles = makeStyles(styles);

export const App: React.FC = () => {
  const classes = useStyles();

  const { setOnline } = useCoreActions();
  const theme = useSelector(selectCore.theme);

  useEffect(() => {
    // Internet connection checker. Dispatching online status
    // use when connection is OFF, we close all sockets and intervals.
    // When ON - turn on socket and rest
    const update = () => {
      ipcRenderer.send('status-changed', navigator.onLine);
      setOnline(navigator.onLine);
    };
    window.addEventListener('online', update);
    window.addEventListener('offline', update);

    update();

    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, [setOnline]);

  return (
    <MuiThemeProvider theme={createTheme(theme)}>
      <ConnectedRouter history={history}>
        <div className={classes.root}>
          {isMac ? <MacHeader /> : <WinHeader />}
          <div className={classes.container}>
            <div className={classes.leftMenu}>
              <LeftMenu />
            </div>
            <Switch>
              <Route exact path="/" component={Analysis} />
              {/* <Route path="/settings" component={Settings} /> */}
            </Switch>
          </div>
        </div>
      </ConnectedRouter>
    </MuiThemeProvider>
  );
};
