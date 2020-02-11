import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import ShowChart from '@material-ui/icons/ShowChart';
import Paper from '@material-ui/core/Paper';
import Settings from '@material-ui/icons/Settings';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import styles from './styles';
import { appRouting } from '../../appConstant';

const useStyles = makeStyles(styles);

const LeftMenu: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const pathname = useSelector((state: any) => state.router.location.pathname);

  const pushToPage = (page: string): (() => void) => () => {
    dispatch(push(page));
  };

  return (
    <Paper className={classes.root}>
      <BottomNavigationAction
        classes={{
          root: `${classes.menuButton} ${pathname === appRouting.path.EXPLORE ? classes.active : ''}`,
        }}
        onClick={pushToPage(appRouting.path.EXPLORE)}
        showLabel
        label={appRouting.labels.EXPLORE}
        icon={<ShowChart />}
      />

      <BottomNavigationAction
        classes={{
          root: `${classes.menuButton} ${pathname === appRouting.path.SETTINGS ? classes.active : ''}`,
        }}
        onClick={pushToPage(appRouting.path.SETTINGS)}
        showLabel
        label="Settings"
        icon={<Settings />}
      />
    </Paper>
  );
};

export default LeftMenu;
