import 'react-virtualized/styles.css';
import React from 'react';
import { AutoSizer, List } from 'react-virtualized';
import StarOutlined from '@mui/icons-material/StarOutline';
import StarBorder from '@mui/icons-material/StarBorder';
import { formatQuantity } from '../../../utils/setFormatPrice';
import ListItemTextWithPrice from './ListItemTextWithPrice';
import { PairInfoModel } from 'core/models';
import { IconButton, ListItem, ListItemText, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';

interface PairListProps {
  list: PairInfoModel[];
  setPair: (pair: TradeSymbol) => void;
  toggleWatchlist: (watch: PairInfoModel) => void;
  watchlist: PairInfoModel[];
}

interface RowRenderer {
  index: number;
  key: string;
  style: any;
}

// Render your list
const PairList: React.FC<PairListProps> = observer(({ list, setPair, toggleWatchlist, watchlist }) => {
  const rowRenderer = ({
    index, // Index of row
    key, // Unique key within array of rendered rows
    style, // Style object to be applied to row (to position it);
  }: RowRenderer) => {
    const pair = list[index];

    return (
      <div className="w-full flex" key={key} style={style}>
        <ListItem button className="pr-0 pl-2 py-1" onClick={() => setPair(pair.symbol)}>
          <ListItemText
            classes={{
              primary: 'text-sm',
              secondary: 'text-sx',
            }}
            primary={pair.symbol}
            secondary={`Vol: ${formatQuantity(pair.volume)}`}
          />
          <ListItemTextWithPrice pair={pair} />

          <IconButton
            className="w-12 h-12 hover:bg-transparent"
            onClick={(e) => {
              e.stopPropagation();
              toggleWatchlist(pair);
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {watchlist.some((watchlistPair) => watchlistPair.symbol === pair.symbol) ? (
              <StarOutlined classes={{ root: 'text-lg' }} />
            ) : (
              <StarBorder classes={{ root: 'text-lg' }} />
            )}
          </IconButton>
        </ListItem>
      </div>
    );
  };

  return (
    <AutoSizer>
      {({ width, height }) => (
        <List
          width={width}
          height={height}
          rowCount={list.length}
          rowHeight={55}
          rowRenderer={rowRenderer}
          noRowsRenderer={() => <Typography className="mt-1 ml-2">There are no pairs</Typography>}
        />
      )}
    </AutoSizer>
  );
});

export default PairList;
