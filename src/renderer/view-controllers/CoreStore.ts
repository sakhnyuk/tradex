import { action, makeObservable, observable } from 'mobx';
import { ThemeType } from 'app/theme';
import { Service } from 'typedi';

@Service()
export class CoreViewController {
  @observable theme: ThemeType = ThemeType.LIGHT;
  @observable isOnline = true;

  constructor() {
    makeObservable(this);
  }

  @action
  setTheme = (theme: ThemeType) => {
    this.theme = theme;
  };

  @action
  setIsOnline = (value: boolean) => {
    this.isOnline = value;
  };
}
