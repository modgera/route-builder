import React from 'react';

import { Store } from './store/provider';
import RouteBuilder from './components/RouteBuilder';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

const App = () => {
  return (
    <ErrorBoundary>
      <Store>
        <RouteBuilder />
      </Store>
    </ErrorBoundary>
  );
};

export default App;
