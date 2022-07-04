import React from 'react';
import { Outlet } from 'react-router-dom';
import { MacHeader } from 'app/components/Header';
import { useViewControllers } from 'app/view-controllers';

export const AppLayout = () => {
  const { core } = useViewControllers();

  React.useEffect(() => {
    core.startTrackOnlineStatus();

    return () => {
      core.stopTrackOnlineStatus();
    };
  }, []);

  return (
    <div className="flex justify-start flex-col overflow-hidden w-screen h-screen">
      <MacHeader />

      <div className="flex flex-1 electron-no-drag">
        <Outlet />
      </div>
    </div>
  );
};
