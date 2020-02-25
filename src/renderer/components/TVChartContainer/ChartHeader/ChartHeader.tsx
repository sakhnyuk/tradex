/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import classnames from 'classnames';
import Refresh from '@material-ui/icons/Refresh';
import Fullscreen from '@material-ui/icons/Fullscreen';
import IconButton from '@material-ui/core/IconButton';
import { useSelector } from 'react-redux';
import styles from './styles';
import { SeriesStyle } from '../../../../charting_library/charting_library.min';
import { useChartActions } from '../../../store/chart/useChartActions';
import { useCoreActions } from '../../../store/core/useCoreActions';
import { Intervals } from '../../../store/exchange/types';
import { selectSupportedIntervals } from '../../../store/exchange/selectors';
import { chartSelector } from '../../../store/chart/selectors';
import { LayoutsIntervalsKeys, Layouts } from '../../../store/chart/types';
import { IntervalMenu } from './components/IntervalMenu';

export const useStyles = makeStyles(styles);

const layouts: Layouts[] = ['one', 'leftright', 'topbot', 'topbotleftright'];
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
};

const candleTypes = [
  { name: 'Bars', code: 0 },
  { name: 'Candles', code: 1 },
  { name: 'Hollow candles', code: 9 },
  { name: 'Heiken ashi', code: 8 },
  { name: 'Line', code: 2 },
  { name: 'Area', code: 3 },
  { name: 'Baseline', code: 10 },
];

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

const CandlesMenu = ({ setCandleType, anchorEl, handleClose }) => {
  const classes = useStyles();

  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
      {candleTypes.map(candleType => (
        <MenuItem
          classes={{ root: classes.menuItem }}
          key={candleType.code}
          onClick={() => setCandleType(candleType.code)}
        >
          {candleType.name}
        </MenuItem>
      ))}
    </Menu>
  );
};

const LayoutMenu = ({ anchorEl, setLayout, handleLayoutClose }) => {
  return <Menu id="layout-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleLayoutClose} />;
};

interface Props {
  activeInterval: Intervals;
  containerId: LayoutsIntervalsKeys;
  setCandleType: (type: SeriesStyle) => void;
  showIndicatorsDialog: () => void;
  isAnalysis: boolean;
}

const ChartHeader: React.FC<Props> = ({
  activeInterval,
  showIndicatorsDialog,
  containerId,
  setCandleType,
  isAnalysis,
}) => {
  const classes = useStyles();

  const { setLayout, setChartInterval } = useChartActions();
  const { setReloadChart } = useCoreActions();
  const supportedIntervals = useSelector(selectSupportedIntervals);
  const layout = useSelector(chartSelector.layout);

  const [shouldBeOpened, setShouldBeOpened] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [candlesAnchorEl, setCandlesAnchorEl] = useState(null);
  const [layoutAnchorEl, setLayoutAnchorEl] = useState(null);
  const [intervals, setIntervals] = useState([]);
  const { minutes, hours, days } = supportedIntervals;

  const handleIntervalChange = useCallback(
    (interval: Intervals) => {
      setChartInterval({ layout, interval, id: containerId });
    },
    [containerId, layout, setChartInterval],
  );

  const handleLayoutOpen = event => {
    setLayoutAnchorEl(event.currentTarget);
  };

  const handleLayoutClose = () => {
    setLayoutAnchorEl(null);
  };

  const showCandlesMenu = event => {
    setCandlesAnchorEl(event.currentTarget);
  };

  const handleOpen = (event, exactIntervals) => {
    setAnchorEl(event.currentTarget);
    setIntervals(exactIntervals);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCandlesClose = () => {
    setCandlesAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <div className={classes.chartHeaderLeft}>
        <IntervalMenu
          anchorEl={anchorEl}
          handleClose={handleClose}
          intervals={intervals}
          onIntervalChange={handleIntervalChange}
        />
        <CandlesMenu
          anchorEl={candlesAnchorEl}
          handleClose={handleCandlesClose}
          setCandleType={setCandleType}
          candleTypes={candleTypes}
        />
        {minutes.length > 1 ? (
          <div
            className={classnames({
              [classes.menuButton]: true,
              [classes.active]: minutes.includes(activeInterval),
            })}
            onClick={event => handleOpen(event, minutes)}
          >
            <span>{minutes.includes(activeInterval) ? intervalDictionary[activeInterval] : 'm'}</span>
            <span className={classes.arrowBottom}>&#x25bc;</span>
          </div>
        ) : (
          minutes.map(minuteInterval => (
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
            onClick={event => handleOpen(event, hours)}
          >
            <span>{hours.includes(activeInterval) ? intervalDictionary[activeInterval] : 'H'}</span>
            <span className={classes.arrowBottom}>&#x25bc;</span>
          </div>
        ) : (
          hours.map(hourInterval => (
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
        {days.map(dayInterval => (
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
        <span className={classes.menuButton} onClick={showCandlesMenu}>
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
        {isAnalysis &&
          layouts.map(layoutItem => (
            <IconButton
              key={layoutItem}
              onClick={() => {
                setLayout(layoutItem);
                handleLayoutClose();
              }}
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

        {/* <IconButton
          onClick={() => {
            // if already full screen; exit
            // else go fullscreen
            if (
              document.fullscreenElement ||
              document.webkitFullscreenElement ||
              document.mozFullScreenElement ||
              document.msFullscreenElement
            ) {
              if (document.exitFullscreen) {
                document.exitFullscreen();
              } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
              } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
              } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
              }
            } else {
              const element = document.querySelector(`#${containerId}`);
              if (element.requestFullscreen) {
                element.requestFullscreen();
              } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
              } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
              } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
              }
            }
          }}
          color="inherit"
          classes={{ root: classes.icon, label: classes.iconLabel }}
          disableRipple
        >
          <Fullscreen className={classes.fontSize} />
        </IconButton> */}
      </div>

      <LayoutMenu
        classes={classes}
        anchorEl={layoutAnchorEl}
        setLayout={setLayout}
        handleLayoutClose={handleLayoutClose}
      />
    </div>
  );
};

export default ChartHeader;
