import React, { useState } from 'react';
import { IntervalMenu } from './components/IntervalMenu';
import { CandlesMenu } from './components/CandlesMenu';
import { useViewControllers } from 'app/view-controllers';
import { ChartTimeframe } from 'core/types';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';

export const intervalDictionary: Record<ChartTimeframe, string> = {
  1: '1m',
  3: '3m',
  5: '5m',
  15: '15m',
  30: '30m',
  60: '1H',
  120: '2H',
  240: '4H',
  360: '6H',
  480: '8H',
  720: '12H',
  '1D': '1D',
  '1W': '1W',
  '1M': '1M',
};

const ChartHeader: React.FC = observer(() => {
  const { tvChartViewController, timeframeController } = useViewControllers();

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [candlesAnchorEl, setCandlesAnchorEl] = useState<Element | null>(null);
  const [intervals, setIntervals] = useState<ChartTimeframe[]>([]);

  const { minutes, hours, days } = timeframeController.groupedTimeframes;

  const handleCandlesOpen = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    setCandlesAnchorEl(event.currentTarget);
  };

  const handleCandlesClose = () => {
    setCandlesAnchorEl(null);
  };

  const handleIntervalMenuOpen = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    exactIntervals: ChartTimeframe[],
  ) => {
    setAnchorEl(event.currentTarget);
    setIntervals(exactIntervals);
  };

  const handleIntervalMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex justify-between items-center bg-ui-paper">
      <div className="w-1/2 h-5 pl-1 flex justify-start items-center">
        <IntervalMenu
          anchorEl={anchorEl}
          handleClose={handleIntervalMenuClose}
          intervals={intervals}
          onIntervalChange={timeframeController.setTimeframe}
        />

        <CandlesMenu
          anchorEl={candlesAnchorEl}
          handleClose={handleCandlesClose}
          setCandleType={tvChartViewController.setCandleType}
        />

        {minutes.length > 1 ? (
          <div
            className={clsx('text-sm cursor-pointer text-typo-primary font-normal mr-2 whitespace-nowrap last:ml-1', {
              ['text-typo-active']: minutes.includes(timeframeController.currentTimeframe),
            })}
            onClick={(event) => handleIntervalMenuOpen(event, minutes)}
          >
            <span>
              {minutes.includes(timeframeController.currentTimeframe)
                ? intervalDictionary[timeframeController.currentTimeframe]
                : 'm'}
            </span>
            <span className="ml-1 text-xs">&#x25bc;</span>
          </div>
        ) : (
          minutes.map((minuteInterval) => (
            <span
              key={minuteInterval}
              className={clsx('text-sm cursor-pointer text-typo-primary font-normal mr-2 whitespace-nowrap last:ml-1', {
                ['text-typo-active']: minuteInterval === timeframeController.currentTimeframe,
              })}
              onClick={() => timeframeController.setTimeframe(minuteInterval)}
            >
              {intervalDictionary[minuteInterval]}
            </span>
          ))
        )}
        {hours.length > 1 ? (
          <div
            className={clsx('text-sm cursor-pointer text-typo-primary font-normal mr-2 whitespace-nowrap last:ml-1', {
              ['text-typo-active']: hours.includes(timeframeController.currentTimeframe),
            })}
            onClick={(event) => handleIntervalMenuOpen(event, hours)}
          >
            <span>
              {hours.includes(timeframeController.currentTimeframe)
                ? intervalDictionary[timeframeController.currentTimeframe]
                : 'H'}
            </span>
            <span className="ml-1 text-xs">&#x25bc;</span>
          </div>
        ) : (
          hours.map((hourInterval) => (
            <span
              key={hourInterval}
              className={clsx('text-sm cursor-pointer text-typo-primary font-normal mr-2 whitespace-nowrap last:ml-1', {
                ['text-typo-active']: hourInterval === timeframeController.currentTimeframe,
              })}
              onClick={() => timeframeController.setTimeframe(hourInterval)}
            >
              {intervalDictionary[hourInterval]}
            </span>
          ))
        )}

        {days.map((dayInterval) => (
          <span
            key={dayInterval}
            className={clsx('text-sm cursor-pointer text-typo-primary font-normal mr-2 whitespace-nowrap last:ml-1', {
              ['text-typo-active']: dayInterval === timeframeController.currentTimeframe,
            })}
            onClick={() => timeframeController.setTimeframe(dayInterval)}
          >
            {dayInterval.toUpperCase()}
          </span>
        ))}

        <span
          className="text-sm cursor-pointer text-typo-primary font-normal mr-2 whitespace-nowrap last:ml-1"
          onClick={handleCandlesOpen}
        >
          Candles
        </span>

        <span className="text-typo-primary mr-2">|</span>

        <span
          className="text-sm cursor-pointer text-typo-primary font-normal mr-2 whitespace-nowrap last:ml-1"
          onClick={() => {
            tvChartViewController.showIndicatorDialog();
          }}
        >
          Indicators
        </span>
      </div>
    </div>
  );
});

export default ChartHeader;
