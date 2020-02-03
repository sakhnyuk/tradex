import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { AutoSizer, List } from 'react-virtualized';

import BookRow from '../BookRow';
import styles from '../style';

const useStyles = makeStyles(styles);

interface Props {
  side: 'bids' | 'asks';
  color: 'green' | 'red';
}

const RenderTable: React.FC<Props> = ({ side, color }) => {
  const classes = useStyles();

  const handleResize = () => {
    const asksRef = document.getElementById('list');

    asksRef.scrollTop = asksRef.scrollHeight - asksRef.clientHeight;
  };

  useEffect(() => {
    setTimeout(handleResize, 200);
  });

  return (
    <AutoSizer disableWidth defaultHeight={300}>
      {({ height }) => (
        <List
          id="list"
          className={classes.askArea}
          width={312}
          height={height}
          rowCount={1000}
          rowHeight={19}
          scrollToAlignment="center"
          rowRenderer={({ index, style, key }: any) => (
            <BookRow color={color} side={side} index={index} style={style} key={key} />
          )}
        />
      )}
    </AutoSizer>
  );
};

export default RenderTable;
