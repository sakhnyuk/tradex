/* eslint-disable react/no-multi-comp */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { useSelector } from 'react-redux';

import ExchangeAccList from './ExchangesAccList';
import { useCoreActions } from '../../store/core/useCoreActions';
import { selectCore } from '../../store/core/selectors';
import { appRouting, exchanges } from '../../appConstant';
import styles from './styles';

const useStyles = makeStyles(styles);

interface Props {
  isExplore?: boolean;
}

const Exchanges: React.FC<Props> = ({ isExplore }) => {
  const classes = useStyles();

  const isOpen = useSelector(selectCore.settingOpen);
  const { setOpenSetting } = useCoreActions();

  const closeHandler = () => setOpenSetting(false);

  return (
    <Dialog onClose={closeHandler} open={isOpen}>
      <Tabs variant="fullWidth" textColor="primary" value={0}>
        {isExplore && (
          <Tab
            label={appRouting.labels.EXPLORE}
            classes={{
              root: classes.label,
              selected: classes.selectedLabel,
            }}
          />
        )}
      </Tabs>

      <div className={classes.dialog}>{isExplore && <ExchangeAccList isExplore />}</div>
    </Dialog>
  );
};

export default Exchanges;
