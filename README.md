# Tradex Platform

## An All-in-One Crypto Trading App

Desktop cross platform client (MacOS and Windows) for explore and trading on all major cryptocurrency exchanges from one place.

## Motivation

Crypto enthusiasts are convinced the market for digital assets will soon be as large as the Forex market. However, most experts believe that a mass adoption of crypto trading and the arrival of large institutional investors is still far in the future. The reason is the extreme immaturity of the industry and high risks. Even though the largest crypto exchanges can boast daily trading volumes reaching billions of dollars, their levels of security, reliability and usability are still far below those of traditional stock exchanges.

### Main problems

- **Poor functionality:** Exchanges can be both overloaded by unnecessary features or very poor. They often lack key chart indicators and analytical tools, as well as important trading features: orders on chart, alerts, and advanced order types (trailing profit, stop loss, etc.)

- **Lack of a standard interface:** Exchanges UI is not just difficult to use – it is not standardized, either. Each exchange has its own chart tools, order types, order placement, etc. As a result, traders have to waste hours on learning to use multiple interfaces.

- **Difficult work on multiple accounts:** Trading on multiple exchanges requires keep open few browsers and a lot of tab, which slows down a computer and can disrupt trading operations.

- **Phishing exchange web pages:** If a user enters login and password details on a phishing site, they will fall into the hands of criminals, who can then easily steal the user’s funds stored on the real exchange (sometimes even with an activated 2FA).

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

- [Typescript](https://www.typescriptlang.org/) - typed superset of JavaScript that compiles to plain JavaScript.

- [ElectronJS](https://electronjs.org/) - cross platform desktop apps with JavaScript, HTML, and CSS

- [React](https://reactjs.org/) - base front-end library

- [Redux](https://redux.js.org/) / [redux-saga](https://github.com/redux-saga/redux-saga) - state management for React

## Overall structure overview

There are two main folders in the app(./src): main and renderer. Two electron processes, one with node env which starts the app and one with browser, which renders the app. The later represents react SPA with redux/sagas state. It is single page which consist of trading view chart, trades, orderbook, pair list and etc. Each one of them have its own component in `renderer/app/components` folder. All logic have its place in sagas middleware from `app/store` folder.

### Installation

1. Clone the repo

```
git clone https://github.com/sakhnyuk/tradex
```

2. Install NPM packages

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
