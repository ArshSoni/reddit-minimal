import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

import './index.css';
import App from './App';

const appContainer = document.getElementById('root');

ReactDOM.render(
  <BrowserRouter>
      <App />
  </BrowserRouter>,
  appContainer
);
registerServiceWorker();
