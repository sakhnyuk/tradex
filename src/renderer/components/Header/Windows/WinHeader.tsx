/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// TODO: change DIV buttons

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { remote } from 'electron';

import styles from './style';
import { appName } from '../../../appConstant';

const useStyles = makeStyles(styles);

const WinHeader: React.FC = () => {
  const classes = useStyles();
  const [showMaxButton, toggleMaxRestoreButtons] = useState(true);
  const electronWindow = remote.getCurrentWindow();

  const onMinButtonClick = () => {
    electronWindow.minimize();
  };

  const onMaxButtonClick = () => {
    electronWindow.maximize();
    toggleMaxRestoreButtons(false);
  };

  const onRestoreButtonClick = () => {
    electronWindow.unmaximize();
    toggleMaxRestoreButtons(true);
  };

  const onCloseButtonClick = () => {
    electronWindow.close();
  };

  return (
    <header className={classes.titlebar}>
      <div>
        <div className={classes.windowTitle}>
          <span>{appName}</span>
        </div>

        <div className={classes.windowControls}>
          <div onClick={onMinButtonClick} className={classes.minButton}>
            <span>&#xE921;</span>
          </div>
          {showMaxButton ? (
            <div onClick={onMaxButtonClick} className={classes.centerButton}>
              <span>&#xE922;</span>
            </div>
          ) : (
            <div onClick={onRestoreButtonClick} className={classes.centerButton}>
              <span>&#xE923;</span>
            </div>
          )}

          <div onClick={onCloseButtonClick} className={classes.closeButton}>
            <span>&#xE8BB;</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default WinHeader;
