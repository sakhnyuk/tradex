/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
// import Refresh from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import { useSelector } from 'react-redux';
import { SeriesStyle } from 'charting_library/charting_library.min';
import styles from './styles';
import { useChartActions } from '../../../store-old/chart/useChartActions';
import { Intervals } from '../../../store-old/exchange/types';
import { selectSupportedIntervals } from '../../../store-old/exchange/selectors';
import { chartSelector } from '../../../store-old/chart/selectors';
import { LayoutsIntervalsKeys, Layouts } from '../../../store-old/chart/types';
import { IntervalMenu } from './components/IntervalMenu';
import { CandlesMenu } from './components/CandlesMenu';

export const useStyles = makeStyles(styles);

const layouts: Layouts[] = ['one', 'leftright', 'topbot', 'topbotleftright'];

// TODO: Add resolution from API
export const intervalDictionary = {
  1: '1m',
  3: '3m',
  5: '5m',
  10: '10m',
  15: '15m',
  30: '30m',
  60: '1H',
  120: '2H',
  180: '3H',
  240: '4H',
  360: '6H',
  480: '8H',
  720: '12H',
  '1D': '1D',
  '1W': '1W',
  '1M': '1M',
};

const renderSvg = {
  one: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="12">
      <rect width="10" height="10" fill="none" stroke="currentColor" rx="2" transform="translate(.5 .5)" />
    </svg>
  ),
  leftright: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="12">
      <g fill="none" stroke="currentColor" transform="translate(.5 .5)">
        <rect width="10" height="10" rx="2" />
        <path d="M5 0v10" />
      </g>
    </svg>
  ),
  topbot: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="12">
      <g fill="none" stroke="currentColor" transform="translate(.5 .5)">
        <rect width="10" height="10" rx="2" />
        <path d="M0 5h10" />
      </g>
    </svg>
  ),
  topbotleftright: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="12">
      <g fill="none" stroke="currentColor" transform="translate(.5 .5)">
        <rect width="10" height="10" rx="2" />
        <path d="M0 5h10M5 0v10" />
      </g>
    </svg>
  ),
};

interface Props {
  activeInterval: Intervals;
  containerId: LayoutsIntervalsKeys;
  setCandleType: (type: SeriesStyle) => void;
  showIndicatorsDialog: () => void;
  isExplore?: boolean;
}

const ChartHeader: React.FC<Props> = ({
  activeInterval,
  showIndicatorsDialog,
  containerId,
  setCandleType,
  isExplore,
}) => {
  const classes = useStyles();

  const { setLayout, setChartInterval } = useChartActions();
  const supportedIntervals = useSelector(selectSupportedIntervals);
  const layout = useSelector(chartSelector.layout);

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [candlesAnchorEl, setCandlesAnchorEl] = useState<Element | null>(null);
  const [intervals, setIntervals] = useState<Intervals[]>([]);

  const { minutes, hours, days } = supportedIntervals;

  const handleIntervalChange = useCallback(
    (interval: Intervals) => {
      setChartInterval({ layout, interval, id: containerId });
    },
    [containerId, layout, setChartInterval],
  );

  const handleCandlesOpen = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    setCandlesAnchorEl(event.currentTarget);
  };

  const handleCandlesClose = () => {
    setCandlesAnchorEl(null);
  };

  const handleInntervalMenuOpen = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    exactIntervals: Intervals[],
  ) => {
    setAnchorEl(event.currentTarget);
    setIntervals(exactIntervals);
  };

  const handleIntervalMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <div className={classes.chartHeaderLeft}>
        <IntervalMenu
          anchorEl={anchorEl}
          handleClose={handleIntervalMenuClose}
          intervals={intervals}
          onIntervalChange={handleIntervalChange}
        />

        <CandlesMenu anchorEl={candlesAnchorEl} handleClose={handleCandlesClose} setCandleType={setCandleType} />

        {minutes.length > 1 ? (
          <div
            className={classnames({
              [classes.menuButton]: true,
              [classes.active]: minutes.includes(activeInterval),
            })}
            onClick={(event) => handleInntervalMenuOpen(event, minutes)}
          >
            <span>{minutes.includes(activeInterval) ? intervalDictionary[activeInterval] : 'm'}</span>
            <span className={classes.arrowBottom}>&#x25bc;</span>
          </div>
        ) : (
          minutes.map((minuteInterval) => (
            <span
              key={minuteInterval}
              className={classnames({
                [classes.menuButton]: true,
                [classes.active]: minuteInterval === activeInterval,
              })}
              onClick={() => handleIntervalChange(minuteInterval)}
            >
              {intervalDictionary[minuteInterval]}
            </span>
          ))
        )}
        {hours.length > 1 ? (
          <div
            className={classnames({
              [classes.menuButton]: true,
              [classes.active]: hours.includes(activeInterval),
            })}
            onClick={(event) => handleInntervalMenuOpen(event, hours)}
          >
            <span>{hours.includes(activeInterval) ? intervalDictionary[activeInterval] : 'H'}</span>
            <span className={classes.arrowBottom}>&#x25bc;</span>
          </div>
        ) : (
          hours.map((hourInterval) => (
            <span
              key={hourInterval}
              className={classnames({
                [classes.menuButton]: true,
                [classes.active]: hourInterval === activeInterval,
              })}
              onClick={() => handleIntervalChange(hourInterval)}
            >
              {intervalDictionary[hourInterval]}
            </span>
          ))
        )}

        {days.map((dayInterval) => (
          <span
            key={dayInterval}
            className={classnames({
              [classes.menuButton]: true,
              [classes.active]: dayInterval === activeInterval,
            })}
            onClick={() => handleIntervalChange(dayInterval)}
          >
            {dayInterval.toUpperCase()}
          </span>
        ))}

        <span className={classes.menuButton} onClick={handleCandlesOpen}>
          Candles
        </span>

        <span className={classes.divider} style={{ marginRight: 8 }}>
          |
        </span>

        <span
          className={classes.menuButton}
          onClick={() => {
            showIndicatorsDialog();
          }}
        >
          Indicators
        </span>
      </div>

      <div className={classes.chartHeaderRight}>
        {isExplore &&
          layouts.map((layoutItem) => (
            <IconButton
              key={layoutItem}
              onClick={() => setLayout(layoutItem)}
              color="inherit"
              classes={{ root: classes.icon, label: classes.iconLabel }}
            >
              {renderSvg[layoutItem]()}
            </IconButton>
          ))}

        {/* <IconButton
          onClick={() => {
            // reload
            setReloadChart(containerId);
          }}
          color="inherit"
          classes={{ root: classes.icon, label: classes.iconLabel }}
          disableRipple
        >
          <Refresh className={classes.fontSize} />
        </IconButton> */}
      </div>
    </div>
  );
};

export default ChartHeader;
