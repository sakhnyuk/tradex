import { Route, Routes } from 'react-router-dom';
import Explore from './Explore';
import { AppLayout } from './AppLayout';
import { RoutePaths } from 'services/navigation';

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
