import React from 'react';
import ReactDOM from 'react-dom';

import Router from './Router';
import './style.css';

ReactDOM.render(<Router />, document.getElementById('app'));

module.hot.accept();
