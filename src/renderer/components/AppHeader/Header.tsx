import React from 'react';
import { AppBar, Box, Button, Grid, ListItem, ListItemText } from '@mui/material';
import { Toolbar } from '@mui/material';
import PriceComp from '../PriceComp';
import { formatPrice, formatQuantity } from 'app/utils/setFormatPrice';
import { useViewControllers } from 'app/view-controllers';
import { observer } from 'mobx-react-lite';

const Header = observer(() => {
  const { exchangeViewController, pairViewController } = useViewControllers();

  return (
    <div className="flex flex-col shadow-xs">
      <AppBar
        className="z-auto w-full bg-ui-paper text-typo-primary header-transition"
        position="relative"
        elevation={0}
      >
        <Toolbar disableGutters className="min-h-fit">
          <div className="flex justify-center items-center h-12 py-1 px-8 whitespace-nowrap font-bold" color="inherit">
            {pairViewController.activePair}
          </div>

          <Button
            className=" border-l-2 border-solid border-ui-default h-12 rounded-none relative py-1 px-8 whitespace-nowrap"
            onClick={() => {}}
            color="inherit"
          >
            {exchangeViewController.activeExchange}
            <span className="absolute right-3 bottom-0 text-typo-secondary text-[10px]">exchange</span>
          </Button>

          <Grid container alignItems="center" className="pl-20 text-typo-primary">
            <Grid item>
              <ListItem className="p-0 pl-4">
                <ListItemText
                  primary="Last Price"
                  secondary={<PriceComp />}
                  classes={{
                    primary: 'text-left text-xs p-0',
                    secondary: 'text-left text-sm p-0 text-typo-primary',
                    multiline: 'py-1 m-0',
                  }}
                />
              </ListItem>
            </Grid>

            <Grid item>
              <ListItem className="p-0 pl-4">
                <ListItemText
                  primary="24h Change"
                  secondary={'10%'}
                  classes={{
                    primary: 'text-left text-xs p-0',
                    secondary: 'text-left text-sm p-0 text-typo-primary',
                    multiline: 'py-1 m-0',
                  }}
                />
              </ListItem>
            </Grid>

            <Grid item>
              <ListItem className="p-0 pl-4">
                <ListItemText
                  primary="24h High"
                  secondary={formatPrice(1000)}
                  classes={{
                    primary: 'text-left text-xs p-0',
                    secondary: 'text-left text-sm p-0 text-typo-primary',
                    multiline: 'py-1 m-0',
                  }}
                />
              </ListItem>
            </Grid>

            <Grid item>
              <ListItem className="p-0 pl-4">
                <ListItemText
                  primary="24h Low"
                  secondary={formatPrice(950)}
                  classes={{
                    primary: 'text-left text-xs p-0',
                    secondary: 'text-left text-sm p-0 text-typo-primary',
                    multiline: 'py-1 m-0',
                  }}
                />
              </ListItem>
            </Grid>

            <Grid item>
              <ListItem className="p-0 pl-4">
                <ListItemText
                  primary="24h Volume"
                  secondary={`${formatQuantity(2000)} USDT`}
                  classes={{
                    primary: 'text-left text-xs p-0',
                    secondary: 'text-left text-sm p-0 text-typo-primary',
                    multiline: 'py-1 m-0',
                  }}
                />
              </ListItem>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
});

export default Header;
