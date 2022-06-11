import React from 'react';
import { createRoot } from 'react-dom/client';
// import { AppContainer } from 'react-hot-loader';
// import { Provider } from 'react-redux';

// import { App } from './App';
// import { configureStore } from './store/configureStore';

// const store = configureStore();

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(<div>Hello</div>);
