import React from 'react';
import { Outlet } from 'react-router-dom';
import { MacHeader } from 'app/components/Header';
import LeftMenu from 'app/components/LeftMenu';

export const AppLayout = () => {
  return (
    <div className="flex justify-start flex-col overflow-hidden w-screen h-screen">
      <MacHeader />

      <div className={`flex flex-1 justify-start items-start`}>
        <div className="h-full w-16 bg-ui-paper">
          <LeftMenu />
        </div>

        <Outlet />
      </div>
    </div>
  );
};
