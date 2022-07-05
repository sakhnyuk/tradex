# Tradex Platform (WIP)

## An All-in-One Crypto Trading App

Desktop cross platform client (MacOS and Windows) for explore trading data on all major cryptocurrency exchanges from one place.

![CleanShot 2022-05-27 at 17 59 42@2x](https://user-images.githubusercontent.com/32235469/170714467-94474d67-328b-4e99-a835-99edb7cce137.png)

## Features

- **All-In-One:** Working with multiple exchanges within a single interface;
- **Speed:** instantly switching between exchanges
- **Candlestick chart:** (available thanks to an integration with tradingview.com) with multiple display options and open orders displayed
- **API:** working directly with exchanges by API.
- **Cross Platform:** support MacOS and Windows

## Support exchanges

| Exchange | Explore (Public data) |
| -------- | :-------------------: |
| Binance  |          ✅           |
| BitMEX   |          ✅           |
| Bitfinex |          ✅           |
| HitBTC   |          ✅           |
| OKex     |          ✅           |
| Poloniex |          ✅           |
| Crex24   |          ✅           |

## Getting Started

### Source code of app build by

- [NodeJS](https://nodejs.org/) (> v8.17.0) - JavaScript runtime with V8 engine

- [Typescript](https://www.typescriptlang.org/) (v3.8.x) - typed superset of JavaScript that compiles to plain JavaScript.

- [ElectronJS](https://electronjs.org/) (v8.x.x) - cross platform desktop apps with JavaScript, HTML, and CSS

- [React](https://reactjs.org/) (16.12.x) - base front-end library

- [Redux](https://redux.js.org/) / [redux-saga](https://github.com/redux-saga/redux-saga) - state management for React

## Overall structure overview

There are two main folders in the app(./src): main and renderer. Two electron processes, one with node env which starts the app and one with browser, which renders the app. The later represents react SPA with redux/sagas state. It is single page which consist of trading view chart, trades, orderbook, pair list and etc. Each one of them have its own component in `renderer/components` folder. All logic have its place in sagas middleware from `app/store` folder.

### Installation

1. Clone the repo

```
git clone https://github.com/sakhnyuk/tradex
```

2. Install NPM packages (inside project folder)

```
npm install
```

or

```
yarn
```

3. Run develop build

```
npm start dev  or  yarn dev
```

4. Build scripts not ready yet

```
...
```

Or package for mac or win with

```
...
```

## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact

- https://github.com/sakhnyuk
