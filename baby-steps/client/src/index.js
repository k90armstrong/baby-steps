// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import AppRoutes from '../src/components/AppRoutes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Store } from './store';
import { register } from './registerServiceWorker.jsx'

ReactDOM.render(
    <MuiThemeProvider>
        <Provider store={Store}>
            <AppRoutes/>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root'));

register(); // register service worker
