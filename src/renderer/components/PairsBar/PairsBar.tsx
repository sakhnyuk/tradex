/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState, useCallback, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Typography from '@material-ui/core/Typography';
import * as exchSel from '../../store-old/exchange/selectors';

import PairList from './PairList';
import styles from './style';
import { selectCore } from '../../store-old/core/selectors';
import { useCoreActions } from '../../store-old/core/useCoreActions';
import { useExchangeActions } from '../../store-old/exchange/useExchangeActions';
import { useExploreActions } from '../../store-old/explore/useExploreActions';
import { SortingPairs } from '../../store-old/core/types';

const useStyles = makeStyles(styles);

interface MarketProps {
  markets: string[];
  activeMarket: string;
  onClick: (market: string) => void;
}

type Sorters = ['Volume', 'Name', 'Price', 'Change'];

const Markets: React.FC<MarketProps> = ({ markets, activeMarket, onClick }) => {
  const classes = useStyles();

  return (
    <ListItem color="inherit" className={classes.markets}>
      {markets.map((market) => (
        <Button
          key={market}
          variant="text"
          size="small"
          classes={{ sizeSmall: classes.buttonMarket, disabled: classes.disabledButtonMarket }}
          onClick={() => onClick(market)}
          disabled={market === activeMarket}
        >
          {market}
        </Button>
      ))}
    </ListItem>
  );
};

const PairsBar: React.FC = () => {
  const classes = useStyles();
  const exchange = useSelector(exchSel.selectExchange);
  const pairList = useSelector(exchSel.selectPairList);
  const markets = useSelector(exchSel.selectMarkets);
  const activeMarket = useSelector(exchSel.selectActiveMarket);
  const filteredPairsList = useSelector(exchSel.selectFilteredPairList);
  const pairsBarOpen = useSelector(selectCore.pairsBarOpen);
  const watchlist = useSelector(exchSel.selectWatchlist);
  const sortBy = useSelector(selectCore.pairListSorting);

  const { setPairListSorting, setOpenPairsBar } = useCoreActions();
  const { requestPairList, setActiveMarket, toggleWatchlist } = useExchangeActions();
  const { setExplorePairAndExchange } = useExploreActions();

  const [searchText, setText] = useState('');
  const [searchedList, setSearchList] = useState<any[]>([]);

  useEffect(() => {
    requestPairList(exchange);
  }, [exchange, requestPairList]);

  useEffect(() => {
    setText('');
  }, [pairsBarOpen]);

  const onChangeSearch = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const { value } = target;

      setText(value);
      const trimedText = value.trim().toLowerCase();
      const data: any[] = Object.values(pairList).filter((p: any) => p.symbol.toLowerCase().match(trimedText));
      setSearchList(data);
    },
    [pairList],
  );

  const onPairClick = useCallback(
    (pair: string) => {
      setExplorePairAndExchange({ exchange, pair });
      setOpenPairsBar(false);
    },
    [exchange, setExplorePairAndExchange, setOpenPairsBar],
  );

  const handleMarketChange = useCallback(
    (pair: string) => {
      setActiveMarket(pair);
      setText('');
    },
    [setActiveMarket],
  );

  const sorters: Sorters = ['Volume', 'Name', 'Price', 'Change'];

  return (
    <Drawer
      classes={{
        paper: classes.drawerPaper,
        modal: classes.modal,
      }}
      open={pairsBarOpen}
      onClose={() => setOpenPairsBar(false)}
    >
      <div>
        <div className={classes.toolbar}>
          <Typography variant="h6" className={classes.exchange}>
            {exchange.toUpperCase()}
          </Typography>

          <IconButton onClick={() => setOpenPairsBar(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />

        <ListItem color="inherit" className={classes.header}>
          <ListItemText primary="Pairs" classes={{ primary: classes.header }} />
        </ListItem>
        <Divider />

        <TextField
          id="search"
          label="Search"
          type="search"
          className={classes.textField}
          margin="normal"
          onChange={onChangeSearch}
          value={searchText}
          variant="outlined"
        />

        <Markets
          markets={markets}
          activeMarket={activeMarket}
          onClick={(market: string) => handleMarketChange(market)}
        />
        <Divider />
      </div>

      <div className={classes.sortHeader}>
        {sorters.map((name) => (
          <div
            key={name}
            className={classes.cell}
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
      </div>

      <List id="drawerList" className={classes.list}>
        {searchText === '' ? (
          <PairList
            list={filteredPairsList[activeMarket]}
            setPair={(pair: string) => onPairClick(pair)}
            toggleWatchlist={toggleWatchlist}
            watchlist={watchlist}
          />
        ) : (
          <PairList
            list={searchedList}
            setPair={(pair: string) => onPairClick(pair)}
            toggleWatchlist={toggleWatchlist}
            watchlist={watchlist}
          />
        )}
      </List>
    </Drawer>
  );
};

export default PairsBar;
