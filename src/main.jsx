import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import MyAuthProvider from './Context/MyAuthProvider.jsx';
import MyScoreProvider from './Context/MyScoreProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <MyAuthProvider>
    <MyScoreProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MyScoreProvider>
  </MyAuthProvider>
);
