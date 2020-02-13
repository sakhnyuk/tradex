/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useSelector } from 'react-redux';
import capitalize from 'lodash/capitalize';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { ListItemAvatar } from '@material-ui/core';

import { useCoreActions } from '../../../store/core/useCoreActions';
import { setPairAndExchange } from '../../../store/exchange/reducer';
import { Exchange } from '../../../appConstant';
import { selectPairAndExchange } from '../../../store/exchange/selectors';

interface Props {
  listData: Exchange[];
  isExplore: boolean;
}

const ExchangesList: React.FC<Props> = ({ isExplore, listData }) => {
  const { setOpenSetting, dispatch } = useCoreActions();
  const { exchange: activeExchange, pair: activePair } = useSelector(selectPairAndExchange);

  const onClickExchangeHandler = (name: Exchange) => {
    dispatch(
      setPairAndExchange({
        exchange: name,
        pair: activePair,
      }),
    );
    setOpenSetting(false);
  };

  return (
    <div>
      {listData.length &&
        listData.map(name => (
          <ListItem key={name} button selected={name === activeExchange} onClick={() => onClickExchangeHandler(name)}>
            <ListItemAvatar>
              <Avatar>{name[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={capitalize(name)} secondary={isExplore ? null : name} />
          </ListItem>
        ))}
    </div>
  );
};

export default ExchangesList;
