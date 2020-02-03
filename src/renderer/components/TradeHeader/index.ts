import { connect } from 'react-redux';
import { compose, onlyUpdateForKeys } from 'recompose';

import { openCloseSetting, openClosePairsBar, changeTheme } from '../../store/modules/core/reducer';

import {
  selectPairInfo,
  selectPairList,
  selectActivePair,
  selectStringPrice,
} from '../../store/modules/exchange/selectors';
import {
  selectTradingMode,
  selectActiveAccountData,
  selectActiveAccount,
} from '../../store/modules/tradingCore/selectors';
import { selectIsMac, selectTheme } from '../../store/modules/core/selectors';

import Header from './Header';
import {
  selectInstructionStep,
  selectInstructionMode,
} from '../../store/modules/instructionMode/selectors';
import { setLayout } from '../../store/modules/layout/reducer';

export default compose(
  connect(
    state => ({
      theme: selectTheme(state),
      ticker: selectActivePair(state),
      pairInfo: selectPairInfo(state),
      lastPrice: selectStringPrice(state),
      pairList: selectPairList(state),
      tradingMode: selectTradingMode(state),
      isMac: selectIsMac(state),
      // needs only to update for its key (not for all account obj(balance etc))
      accountName: selectActiveAccount(state),
      account: selectActiveAccountData(state),
      instructionStep: selectInstructionStep(state),
      isInstructionMode: selectInstructionMode(state),
    }),
    { openCloseSetting, openClosePairsBar, changeTheme, setLayout }
  ),
  onlyUpdateForKeys([
    'ticker',
    'exchange',
    'pairInfo',
    'pairsBarOpen',
    'accountName',
    'theme',
    'instructionStep',
    'isInstructionMode',
  ])
)(Header);
