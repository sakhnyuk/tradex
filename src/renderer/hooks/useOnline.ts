import { useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { useStores } from 'app/store';

/**
 * Internet connection checker. Dispatching online status
 * When connection is OFF, we close all sockets and intervals.
 * When ON - turn on socket and rest
 */
export const useOnline = () => {
  const { core } = useStores();

  useEffect(() => {
    const update = () => {
      ipcRenderer.send('status-changed', navigator.onLine);
      core.setIsOnline(navigator.onLine);
    };
    window.addEventListener('online', update);
    window.addEventListener('offline', update);

    update();

    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, []);
};
