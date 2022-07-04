import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RoutePaths } from 'app/services/navigation';
import { AppLayout } from 'app/App/AppLayout';

import Explore from './Explore';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={RoutePaths.EXPLORE} element={<AppLayout />}>
        <Route index element={<Explore />} />
        <Route path={RoutePaths.SETTINGS} element={<div>Settings</div>} />
      </Route>
    </Routes>
  );
};
