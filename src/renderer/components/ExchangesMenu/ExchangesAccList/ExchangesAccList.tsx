/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useSelector } from 'react-redux';
import capitalize from 'lodash/capitalize';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { ListItemAvatar } from '@material-ui/core';

import { useCoreActions } from '../../../store/core/useCoreActions';
import { selectExchange } from '../../../store/exchange/selectors';
import { useExploreActions } from '../../../store/explore/useExploreActions';
import { exploreSelect } from '../../../store/explore/selectors';
import { InitialExchangeData } from '../../../store/explore/types';

interface Props {
  isExplore: boolean;
}

const ExchangesList: React.FC<Props> = ({ isExplore }) => {
  const { setOpenSetting } = useCoreActions();
  const { setExplorePairAndExchange } = useExploreActions();
  const activeExchange = useSelector(selectExchange);

  const exchangesList = useSelector(exploreSelect.exchangesList);

  const onClickExchangeHandler = (item: InitialExchangeData) => {
    setExplorePairAndExchange({
      exchange: item.name,
      pair: item.activePair,
    });

    setOpenSetting(false);
  };

  return (
    <div>
      {exchangesList.length &&
        exchangesList.map((item: InitialExchangeData) => (
          <ListItem
            key={item.name}
            button
            selected={item.name === activeExchange}
            onClick={() => onClickExchangeHandler(item)}
          >
            <ListItemAvatar>
              <Avatar alt={item.name} src={`../assets/exchanges/${item.name}.png`} />
            </ListItemAvatar>
            <ListItemText primary={capitalize(item.name)} secondary={isExplore ? null : item.name} />
          </ListItem>
        ))}
    </div>
  );
};

export default ExchangesList;
