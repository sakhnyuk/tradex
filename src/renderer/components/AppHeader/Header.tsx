/* eslint-disable max-len */
import React from 'react';
import { AppBar, Box, Button, Grid, ListItem, ListItemText } from '@mui/material';
import { Toolbar } from '@mui/material';
import PriceComp from '../PriceComp';
import { styles } from './style';

// import classnames from 'classnames';
// import Grid from '@material-ui/core/Grid';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Button from '@material-ui/core/Button';
// import { useSelector } from 'react-redux';

// import PriceComp from '../PriceComp';

const Header = () => {
  return (
    <Box sx={styles.headerContainer}>
      <AppBar position="relative" elevation={0} sx={styles.appBar}>
        <Toolbar disableGutters sx={styles.toolbarHeader}>
          <Button sx={styles.pairButton} onClick={() => {}} color="inherit">
            ticker
          </Button>

          <Button sx={styles.pairButton} onClick={() => {}} color="inherit">
            exchange
            <Box sx={styles.accountName}>explore</Box>
          </Button>

          {/* <Grid container alignItems="center" className={classes.tickerInfo}>
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
          </Grid> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
