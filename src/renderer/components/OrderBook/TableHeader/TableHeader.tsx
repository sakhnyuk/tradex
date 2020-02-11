import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Table from '@material-ui/core/Table';

import * as selectExchange from '../../../store/exchange/selectors';
import styles from '../style';

const useStyles = makeStyles(styles);

const TableHeader: React.FC = () => {
  const classes = useStyles();
  const activePair = useSelector(selectExchange.selectActivePair);

  const [base, quote] = activePair.split(/[:/]/);

  return (
    <Table>
      <TableHead>
        <TableRow className={classes.head}>
          <TableCell padding="none" align="center" className={classes.cellHeader}>
            Price
          </TableCell>

          <TableCell padding="none" align="center" className={classes.cellHeader}>
            {base}
          </TableCell>

          <TableCell padding="none" align="center" className={classes.cellHeader}>
            {quote}
          </TableCell>

          <TableCell padding="none" align="center" className={classes.cellHeader}>
            Total
          </TableCell>
        </TableRow>
      </TableHead>
    </Table>
  );
};

export default TableHeader;
