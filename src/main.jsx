import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThirdwebProvider } from '@thirdweb-dev/react';

import { StateContextProvider } from './context';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
// desiredChainId={ChainId.Sepolia}
root.render(
  <Provider store={store}>
  <ThirdwebProvider  clientId="779476181f0cdd6a2d8844a906a3e13e" // You can get a client id from dashboard settings
  activeChain="sepolia" > 
    <Router>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </Router>
    </ThirdwebProvider> 
    </Provider>
)