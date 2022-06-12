import React from 'react';
import { NavLink } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import SettingsIcon from '@mui/icons-material/Settings';
import { RouteLabels, RoutePaths } from 'app/services/navigation';
import clsx from 'clsx';

const LeftMenu: React.FC = () => {
  return (
    <Paper square className="h-full w-16 flex justify-start items-start flex-col bg-ui-paper text-textColor-primary">
      <NavLink to={RoutePaths.EXPLORE}>
        {({ isActive }) => (
          <BottomNavigationAction
            className={clsx(
              'w-16 h-16 min-w-fit p-0 hover:bg-grey-100 transition',
              isActive ? 'text-typo-active' : 'text-typo-secondary',
            )}
            showLabel
            label={RouteLabels[RoutePaths.EXPLORE]}
            icon={<ShowChartIcon />}
          />
        )}
      </NavLink>

      <NavLink to={RoutePaths.SETTINGS}>
        {({ isActive }) => (
          <BottomNavigationAction
            className={clsx(
              'w-16 h-16 min-w-fit p-0 hover:bg-grey-100 transition',
              isActive ? 'text-typo-active' : 'text-typo-secondary',
            )}
            showLabel
            label={RouteLabels[RoutePaths.SETTINGS]}
            icon={<SettingsIcon />}
          />
        )}
      </NavLink>
    </Paper>
  );
};

export default LeftMenu;
