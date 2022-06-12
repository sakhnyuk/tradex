import React from 'react';
import { NavLink } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import SettingsIcon from '@mui/icons-material/Settings';
import { RouteLabels, RoutePaths } from 'app/services/navigation';

const LeftMenu: React.FC = () => {
  return (
    <Paper
      square
      sx={{
        height: '100%',
        width: 64,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
        background: 'background.paper',
        color: 'text.primary',
      }}
    >
      <NavLink to={RoutePaths.EXPLORE}>
        {({ isActive }) => (
          <BottomNavigationAction
            sx={{
              color: (theme) => (isActive ? theme.appColors.active : 'text.default'),
              width: 64,
              maxWidth: 64,
              minWidth: 64,
              minHeight: 64,
              maxHeight: 64,
              height: 64,

              '&:hover': {
                background: 'appColors.hover',
              },
            }}
            showLabel
            label={RouteLabels[RoutePaths.EXPLORE]}
            icon={<ShowChartIcon />}
          />
        )}
      </NavLink>

      <NavLink to={RoutePaths.SETTINGS}>
        {({ isActive }) => (
          <BottomNavigationAction
            sx={{
              color: (theme) => (isActive ? theme.appColors.active : 'text.default'),
              width: 64,
              maxWidth: 64,
              minWidth: 64,
              minHeight: 64,
              maxHeight: 64,
              height: 64,

              '&:hover': {
                background: 'appColors.hover',
              },
            }}
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
