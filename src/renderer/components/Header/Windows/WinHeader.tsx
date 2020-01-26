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

  const onMinButtonClick = () => {
    const electronWindow = remote.getCurrentWindow();
    electronWindow.minimize();
  };

  const onMaxButtonClick = () => {
    const electronWindow = remote.getCurrentWindow();
    electronWindow.maximize();
    toggleMaxRestoreButtons(false);
  };

  const onRestoreButtonClick = () => {
    const electronWindow = remote.getCurrentWindow();
    electronWindow.unmaximize();
    toggleMaxRestoreButtons(true);
  };

  const onCloseButtonClick = () => {
    const electronWindow = remote.getCurrentWindow();
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
            <div onClick={onMaxButtonClick} className={classes.maxButton}>
              <span>&#xE922;</span>
            </div>
          ) : (
            <div onClick={onRestoreButtonClick} className={classes.restoreButton}>
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
