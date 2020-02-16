import React from 'react';
import { AutoSizer, List } from 'react-virtualized';
import get from 'lodash/get';
import StarOutlined from '@material-ui/icons/StarOutlined';
import StarBorder from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { ListItem, ListItemText, makeStyles } from '@material-ui/core';

import { formatQuantity } from '../../../utils/setFormatPrice';
import ListItemTextWithPrice from './ListItemTextWithPrice';
import styles from '../style';

interface PairListProps {
  list: any;
  setPair: (pair: string) => void;
  toggleWatchlist: (watch: { [key: string]: string }) => void;
  watchlist: any[];
}

interface RowRenderer {
  index: number;
  key: string;
  style: any;
}

const useStyles = makeStyles(styles);

// Render your list
const PairList: React.FC<PairListProps> = ({ list, setPair, toggleWatchlist, watchlist }) => {
  const classes = useStyles();

  const rowRenderer = ({
    index, // Index of row
    key, // Unique key within array of rendered rows
    style, // Style object to be applied to row (to position it);
  }: RowRenderer) => {
    const pair = list[index];

    return (
      <div className={classes.menuItemContainer} key={key} style={style}>
        <ListItem button className={classes.menuItem} onClick={() => setPair(get(pair, 'symbol', ''))}>
          <ListItemText
            classes={{
              primary: classes.primary,
              secondary: classes.price,
            }}
            primary={get(pair, 'symbol', '')}
            secondary={`Vol: ${formatQuantity(get(pair, 'volume', ''))}`}
          />
          <ListItemTextWithPrice pair={pair} />

          <IconButton
            className={classes.watchlistIcon}
            onClick={e => {
              e.stopPropagation();
              toggleWatchlist(pair);
            }}
            onMouseDown={e => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {watchlist.some(watchlistPair => watchlistPair.symbol === pair.symbol) ? (
              <StarOutlined classes={{ root: classes.iconSize }} />
            ) : (
              <StarBorder classes={{ root: classes.iconSize }} />
            )}
          </IconButton>
        </ListItem>
      </div>
    );
  };

  return (
    <AutoSizer>
      {({ width, height }: { height: number; width: number }) => (
        <List
          width={width}
          height={height}
          rowCount={list?.length || 0}
          rowHeight={55}
          rowRenderer={rowRenderer}
          className={classes.list}
          noRowsRenderer={() => <Typography className={classes.noPair}>There are no pairs</Typography>}
        />
      )}
    </AutoSizer>
  );
};

export default PairList;
