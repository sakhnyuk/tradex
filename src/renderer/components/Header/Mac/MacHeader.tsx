import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';

const useStyles = makeStyles(styles);

const MacHeader = () => {
  const classes = useStyles();

  return <div className={classes.macHeader} />;
};

export default MacHeader;
