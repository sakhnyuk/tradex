import { useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { useCoreActions } from '../store/core';

/**
 * Internet connection checker. Dispatching online status
 * When connection is OFF, we close all sockets and intervals.
 * When ON - turn on socket and rest
 */
export const useOnline = () => {
  const { setOnline } = useCoreActions();

  useEffect(() => {
    const update = () => {
      ipcRenderer.send('status-changed', navigator.onLine);
      setOnline(navigator.onLine);
    };
    window.addEventListener('online', update);
    window.addEventListener('offline', update);

    update();

    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, [setOnline]);
};
