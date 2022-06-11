import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Explore from '../routes/Explore/Explore';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Explore />} />
      {/* <Route path="/settings" component={Settings} /> */}
    </Routes>
  );
};
