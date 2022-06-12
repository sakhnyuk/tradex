import { app, BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import isDev from 'electron-is-dev';
import log from 'electron-log';
import windowStateKeeper, { State } from 'electron-window-state';
import installExtension, { MOBX_DEVTOOLS, REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';

let mainWindow: BrowserWindow | null;

const mac = process.platform === 'darwin';
// const win = process.platform === 'win32';

// Logger -------------------
log.info('App starting...');
log.info(`Electron version - ${app.getVersion()}`);

// Checker internet connection ---------
// ipcMain.on('status-changed', (_, status) => {
//   if (!status) {
//     const dialogOpts = {
//       type: 'info',
//       message: 'Lost internet connection',
//       detail: 'Something is wrong with internet connection! All trading functions needs a stable internet.',
//     };
//     dialog.showMessageBox(dialogOpts);
//   }
// });

// second app instance handle ---------
log.info('requestSingleInstanceLock...');
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      if (!mainWindow.isVisible()) mainWindow.show();
      mainWindow.focus();
    }
  });
}

// Install react/redux chrome devtools extensions
const installExtensions = async (): Promise<void | any[]> => {
  installExtension([MOBX_DEVTOOLS, REACT_DEVELOPER_TOOLS])
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
};

// main window creator ---------
const createWindow = async (): Promise<void> => {
  if (isDev) {
    // await installExtensions();
  }

  const mainWindowState: State = windowStateKeeper({
    defaultWidth: 1280,
    defaultHeight: 760,
  });

  const windowOptions: BrowserWindowConstructorOptions = {
    fullscreenable: false,
    show: false,
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    minWidth: 1280,
    minHeight: 760,
    titleBarStyle: 'hidden',
    frame: false,
    // icon: path.resolve(__dirname, '../resources/ico-app.ico'),
    webPreferences: {
      nodeIntegration: true, // important option for node api in react app
      webSecurity: false, // CORS off
      contextIsolation: false,
    },
  };

  mainWindow = new BrowserWindow(windowOptions);
  if (mainWindow !== null) {
    mainWindowState.manage(mainWindow);
  }

  if (isDev) {
    process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1';
    mainWindow?.loadURL(`http://localhost:2003`);
  } else {
    mainWindow?.loadURL(`file://${__dirname}/index.html`);
  }

  mainWindow.on('enter-full-screen', (event: Electron.Event) => {
    event.preventDefault();
  });

  mainWindow.once('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  // if (isDev) {
  // Open DevTools, see https://github.com/electron/electron/issues/12438 for why we wait for dom-ready
  mainWindow.webContents.once('dom-ready', () => {
    mainWindow!.webContents.openDevTools();
  });
  // }

  mainWindow.on('close', (event: Event) => {
    if (mainWindow === null) return;

    if (mainWindow.isVisible()) {
      mainWindow.hide();
      event.preventDefault();
    }
  });
};

app.whenReady().then(createWindow);

app.on('before-quit', () => {
  if (mac) app.exit(0);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow !== null) {
    mainWindow.show();
  }
});
