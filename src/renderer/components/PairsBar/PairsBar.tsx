/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useCallback, ChangeEvent } from 'react';
import {
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import PairList from './PairList';
import { useViewControllers } from 'app/view-controllers';
import { observer } from 'mobx-react-lite';

interface MarketProps {
  markets: string[];
  activeMarket: string;
  onClick: (market: string) => void;
}

type Sorters = ['Volume', 'Name', 'Price', 'Change'];

const Markets: React.FC<MarketProps> = ({ markets, activeMarket, onClick }) => {
  return (
    <ListItem color="inherit" className="flex flex-wrap justify-center content-between w-full py-1">
      {markets.map((market) => (
        <Button
          key={market}
          variant="text"
          size="small"
          classes={{ sizeSmall: 'py-1 px-2 min-w-[16%] min-h-[20px] text-xs', disabled: 'text-typo-disabled' }}
          onClick={() => onClick(market)}
          disabled={market === activeMarket}
        >
          {market}
        </Button>
      ))}
    </ListItem>
  );
};

const PairsBar: React.FC = observer(() => {
  const { pairViewController, exchangeViewController } = useViewControllers();

  useEffect(() => {
    pairViewController.getPairList();
  }, []);

  useEffect(() => {
    pairViewController.setSearchPairValue('');
  }, [pairViewController.pairsBarOpen]);

  const onChangeSearch = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    pairViewController.setSearchPairValue(value);
  }, []);

  const onPairClick = useCallback((pair: TradeSymbol) => {
    console.log(pair);
    pairViewController.setActivePair(pair);
    pairViewController.setPairsBarOpen(false);
  }, []);

  const handleMarketChange = useCallback((pair: string) => {
    pairViewController.setActiveMarket(pair);
    pairViewController.setSearchPairValue('');
  }, []);

  // const sorters: Sorters = ['Volume', 'Name', 'Price', 'Change'];

  return (
    <Drawer
      classes={{
        paper: 'relative w-[250px]',
      }}
      open={pairViewController.pairsBarOpen}
      onClose={() => pairViewController.setPairsBarOpen(false)}
    >
      <div>
        <div className="flex items-center justify-around px-2 h-20">
          <Typography variant="h6" className="text-sm">
            {exchangeViewController.activeExchange.toUpperCase()}
          </Typography>

          <IconButton onClick={() => pairViewController.setPairsBarOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />

        <ListItem color="inherit" className="text-center text-sm p-0">
          <ListItemText primary="Pairs" classes={{ primary: 'text-center text-sm p-0' }} />
        </ListItem>
        <Divider />

        <TextField
          id="search"
          label="Search"
          type="search"
          className="mx-2 w-[230px]"
          margin="normal"
          onChange={onChangeSearch}
          value={pairViewController.searchPairValue}
          variant="outlined"
        />

        <Markets
          markets={pairViewController.markets}
          activeMarket={pairViewController.activeMarket}
          onClick={(market: string) => handleMarketChange(market)}
        />
        <Divider />
      </div>

      {/* <div className="h-6 px-1 flex justify-between">
        {sorters.map((name) => (
          <div
            key={name}
            className="whitespace-nowrap py-1 px-1 min-w-[20%] max-w-[20%] text-left text-xs cursor-pointer"
            role="menuitem"
            tabIndex={0}
            onClick={() =>
              sortBy === name ? setPairListSorting(`${name}Descending` as SortingPairs) : setPairListSorting(name)
            }
          >
            {name} {sortBy === name && <span>&#x25B2;</span>}
            {sortBy === `${name}Descending` && <span>&#x25BC;</span>}
          </div>
        ))}
      </div> */}

      <List id="drawerList" className="h-full overflow-hidden p-0 outline-none">
        <PairList
          list={pairViewController.pairList?.mapped.getListByMarket(pairViewController.activeMarket) || []}
          setPair={(pair: TradeSymbol) => onPairClick(pair)}
          toggleWatchlist={() => {}}
          watchlist={[]}
        />
      </List>
    </Drawer>
  );
});

export default PairsBar;
