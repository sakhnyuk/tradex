import React from 'react';
import { makeStyles } from '@material-ui/core';

import MacHeader from '../components/Header/MacOS';
import WinHeader from '../components/Header/Windows';
import LeftMenu from '../components/LeftMenu';
import { isMac } from '../appConstant';
import { Router } from '../routes/Router';
import styles from './styles';

const useStyles = makeStyles(styles);

export const AppLayout = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {isMac ? <MacHeader /> : <WinHeader />}
      <div className={classes.container}>
        <div className={classes.leftMenu}>
          <LeftMenu />
        </div>

        <Router />
      </div>
    </div>
  )
}
