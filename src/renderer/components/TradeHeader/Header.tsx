/* eslint-disable max-len */
import React from 'react';
import classnames from 'classnames';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';

// import PriceComp from '../PriceComp';
import { formatPrice, formatQuantity } from '../../utils/setFormatPrice';
import { useCoreActions } from '../../store/core/useCoreActions';
import styles from './style';
import * as select from '../../store/exchange/selectors';
import { selectCore } from '../../store/core/selectors';
import PriceComp from '../PriceComp';

const useStyles = makeStyles(styles);

interface Props {
  isAnalysis?: boolean;
}

const Header: React.FC<Props> = ({ isAnalysis }) => {
  const classes = useStyles();

  const { setOpenPairsBar, setOpenSetting } = useCoreActions();

  const ticker = useSelector(select.selectActivePair);
  const pairInfo = useSelector(select.selectPairInfo);
  const isMac = useSelector(selectCore.isMac);
  const exchange = useSelector(select.selectExchange);

  const splitData = ticker.split(/[:/]/);

  let percentageData;
  let percentageColor;
  if (pairInfo && pairInfo.priceChangePercent) {
    percentageData = `${pairInfo.priceChangePercent.toFixed(2)}%`;
    percentageColor = pairInfo.priceChangePercent >= 0 ? classes.itemGreen : classes.itemRed;
  } else {
    percentageData = 0;
    percentageColor = classes.itemGreen;
  }

  return (
    <div className={classes.headerContainer}>
      <AppBar position="relative" elevation={0} className={classes.appBar}>
        <Toolbar
          disableGutters
          className={isMac ? classes.macToolbarHeader : classes.toolbarHeader} // padding for topHeader ???
        >
          <Button
            classes={{
              root: classnames({
                [classes.pairButton]: true,
              }),
            }}
            onClick={() => setOpenPairsBar(true)}
            color="inherit"
          >
            {ticker}
          </Button>

          <Button
            classes={{
              root: classnames({
                [classes.pairButton]: true,
                [classes.borderRight]: true,
              }),
            }}
            onClick={() => setOpenSetting(true)}
            color="inherit"
          >
            {/* {account.exchange} */}
            {/* <div className={classes.accountName}>{isAnalysis ? 'analysis' : account.name.slice(0, 16)}</div> */}
            {exchange}
            <div className={classes.accountName}>analysis</div>
          </Button>

          <Grid container alignItems="center" className={classes.tickerInfo}>
            <Grid item>
              <ListItem className={classes.item}>
                <ListItemText
                  primary="Last Price"
                  secondary={<PriceComp />}
                  classes={{
                    primary: classes.itemTitle,
                    secondary: classes.itemWhite,
                    multiline: classes.itemMultiline,
                  }}
                />
              </ListItem>
            </Grid>

            <Grid item>
              <ListItem className={classes.item}>
                <ListItemText
                  primary="24h Change"
                  secondary={pairInfo ? percentageData : null}
                  classes={{
                    primary: classes.itemTitle,
                    secondary: pairInfo ? percentageColor : '',
                    multiline: classes.itemMultiline,
                  }}
                />
              </ListItem>
            </Grid>

            <Grid item>
              <ListItem className={classes.item}>
                <ListItemText
                  primary="24h High"
                  secondary={formatPrice(pairInfo?.high)}
                  classes={{
                    primary: classes.itemTitle,
                    secondary: classes.itemWhite,
                    multiline: classes.itemMultiline,
                  }}
                />
              </ListItem>
            </Grid>

            <Grid item>
              <ListItem className={classes.item}>
                <ListItemText
                  primary="24h Low"
                  secondary={formatPrice(pairInfo?.low)}
                  classes={{
                    primary: classes.itemTitle,
                    secondary: classes.itemWhite,
                    multiline: classes.itemMultiline,
                  }}
                />
              </ListItem>
            </Grid>

            <Grid item>
              <ListItem className={classes.item}>
                <ListItemText
                  primary="24h Volume"
                  secondary={`${formatQuantity(pairInfo?.volume || 0)} ${splitData[1]}`}
                  classes={{
                    primary: classes.itemTitle,
                    secondary: classes.itemWhite,
                    multiline: classes.itemMultiline,
                  }}
                />
              </ListItem>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
