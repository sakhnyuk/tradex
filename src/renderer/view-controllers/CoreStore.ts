import { action, makeObservable, observable } from 'mobx';
import { ThemeType } from 'app/theme';
import { Service } from 'typedi';
import signals from 'signals';

@Service()
export class CoreViewController {
  @observable theme: ThemeType = ThemeType.LIGHT;
  @observable isOnline = navigator.onLine;

  onlineStatusUpdated: signals.Signal<boolean> = new signals.Signal();

  constructor() {
    makeObservable(this);
  }

  @action
  setTheme = (theme: ThemeType) => {
    this.theme = theme;
  };

  @action
  private updateOnlineStatus = () => {
    const status = navigator.onLine;
    this.isOnline = status;
    this.onlineStatusUpdated.dispatch(status);
  };

  addOnlineStatusUpdateListener = (handler: (value: boolean) => void) => {
    this.onlineStatusUpdated.add(handler);
  };

  startTrackOnlineStatus = () => {
    window.addEventListener('online', this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);
  };

  stopTrackOnlineStatus = () => {
    window.removeEventListener('online', this.updateOnlineStatus);
    window.removeEventListener('offline', this.updateOnlineStatus);
  };
}
