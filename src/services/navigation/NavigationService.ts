/* eslint-disable no-restricted-globals */
import { BrowserHistory, createBrowserHistory } from 'history';
import { RoutePaths } from './Routes';

export class NavigationService {
  public static routerHistory: BrowserHistory = createBrowserHistory();

  private static navigate(path: string) {
    this.routerHistory.push(path);
  }

  static goBack = () => {
    this.routerHistory.back();
  };

  static openExplorePage = () => {
    this.navigate(RoutePaths.EXPLORE);
  };

  static openSettings = () => {
    this.navigate(RoutePaths.SETTINGS);
  };
}
