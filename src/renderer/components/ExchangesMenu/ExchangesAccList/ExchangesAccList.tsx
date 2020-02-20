/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useSelector } from 'react-redux';
import capitalize from 'lodash/capitalize';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { ListItemAvatar } from '@material-ui/core';

import { useCoreActions } from '../../../store/core/useCoreActions';
import { Exchange } from '../../../appConstant';
import { selectExchange } from '../../../store/exchange/selectors';
import { useExchangeActions } from '../../../store/exchange/useExchangeActions';

interface Props {
  listData: Exchange[];
  isExplore: boolean;
}

const ExchangesList: React.FC<Props> = ({ isExplore, listData }) => {
  const { setOpenSetting } = useCoreActions();
  const { setExchange } = useExchangeActions();
  const activeExchange = useSelector(selectExchange);

  const onClickExchangeHandler = (name: Exchange) => {
    setExchange(name);
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
