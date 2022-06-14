import 'react-virtualized/styles.css';
import React from 'react';
import { AutoSizer, List } from 'react-virtualized';
import StarOutlined from '@mui/icons-material/StarOutline';
import StarBorder from '@mui/icons-material/StarBorder';
import { formatQuantity } from '../../../utils/setFormatPrice';
import ListItemTextWithPrice from './ListItemTextWithPrice';
import { PairInfoModel, PairListModel } from 'core/models';
import { IconButton, ListItem, ListItemText, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';

interface PairListProps {
  pairListModel: PairListModel | null;
  activeMarket: string;
  setPair: (pair: TradeSymbol) => void;
  toggleWatchlist: (watch: PairInfoModel) => void;
  watchlist: TradeSymbol[];
}

interface RowRenderer {
  index: number;
  key: string;
  style: any;
}

// Render your list
const PairList: React.FC<PairListProps> = observer(
  ({ pairListModel, activeMarket, setPair, toggleWatchlist, watchlist }) => {
    const pairList = pairListModel?.mapped.getListByMarket(activeMarket) ?? [];

    const rowRenderer = ({
      index, // Index of row
      key, // Unique key within array of rendered rows
      style, // Style object to be applied to row (to position it);
    }: RowRenderer) => {
      const pair = pairList[index];
      const pairInfo = pairListModel?.fullList[pair];

      if (!pairInfo) {
        return null;
      }

      return (
        <div className="w-full flex" key={key} style={style}>
          <ListItem button className="pr-0 pl-2 py-1" onClick={() => setPair(pairInfo.symbol)}>
            <ListItemText
              classes={{
                primary: 'text-sm',
                secondary: 'text-sx',
              }}
              primary={pairInfo.symbol}
              secondary={`Vol: ${formatQuantity(pairInfo.volume)}`}
            />
            <ListItemTextWithPrice pair={pairInfo} />

            <IconButton
              className="w-12 h-12 hover:bg-transparent"
              onClick={(e) => {
                e.stopPropagation();
                toggleWatchlist(pairInfo);
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              {watchlist.some((watchlistPair) => pairList[watchlistPair].symbol === pairInfo.symbol) ? (
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
            rowCount={pairList.length}
            rowHeight={55}
            rowRenderer={rowRenderer}
            noRowsRenderer={() => <Typography className="mt-1 ml-2">There are no pairs</Typography>}
          />
        )}
      </AutoSizer>
    );
  },
);

export default PairList;
