import './index.css';

import { App } from './App';
import { DataProvider } from './components';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <DataProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </DataProvider>
  </React.StrictMode>
);
