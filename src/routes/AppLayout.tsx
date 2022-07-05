import React from 'react';
import { Outlet } from 'react-router-dom';
import { useViewControllers } from 'view-controllers';

export const AppLayout = () => {
  const { core } = useViewControllers();

  React.useEffect(() => {
    core.startTrackOnlineStatus();

    return () => {
      core.stopTrackOnlineStatus();
    };
  }, [core]);

  return (
    <div className="flex justify-start flex-col overflow-hidden w-screen h-screen">
      <div className="flex flex-1">
        <Outlet />
      </div>
    </div>
  );
};
