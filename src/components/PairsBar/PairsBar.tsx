import React, { useEffect, useCallback, ChangeEvent } from 'react';
import { Button, Divider, List, ListItem, TextField } from '@mui/material';

import PairList from './PairList';
import { useViewControllers } from 'view-controllers';
import { observer } from 'mobx-react-lite';

interface MarketProps {
  markets: string[];
  activeMarket: string;
  onClick: (market: string) => void;
}

// type Sorters = ['Volume', 'Name', 'Price', 'Change'];

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
  const { pairViewController } = useViewControllers();

  useEffect(() => {
    pairViewController.getPairList();
  }, [pairViewController]);

  const onChangeSearch = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const { value } = target;
      pairViewController.setSearchPairValue(value);
    },
    [pairViewController],
  );

  const onPairClick = useCallback(
    (pair: TradeSymbol) => {
      pairViewController.setActivePair(pair);
    },
    [pairViewController],
  );

  const handleMarketChange = useCallback(
    (pair: string) => {
      pairViewController.setActiveMarket(pair);
      pairViewController.setSearchPairValue('');
    },
    [pairViewController],
  );

  // const sorters: Sorters = ['Volume', 'Name', 'Price', 'Change'];

  return (
    <>
      <div className="px-2">
        <TextField
          id="search"
          label="Search"
          type="search"
          size="small"
          className="w-full"
          margin="normal"
          onChange={onChangeSearch}
          value={pairViewController.searchPairValue}
          variant="outlined"
        />
      </div>

      <Markets
        markets={pairViewController.markets}
        activeMarket={pairViewController.activeMarket}
        onClick={(market: string) => handleMarketChange(market)}
      />

      <Divider />

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

      <List id="drawerList" className="h-[calc(100%-98px)] overflow-hidden p-0 outline-none">
        <PairList
          pairListModel={pairViewController.pairList}
          activeMarket={pairViewController.activeMarket}
          setPair={(pair: TradeSymbol) => onPairClick(pair)}
          toggleWatchlist={() => {}}
          watchlist={[]}
        />
      </List>
    </>
  );
});

export default PairsBar;
