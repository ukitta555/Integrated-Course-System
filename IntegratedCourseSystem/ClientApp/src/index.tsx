import 'bootstrap/dist/css/bootstrap.css';

// react and react-dom imports
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'

// main component
import App from './components/App';

// react-redux and redux imports
import store from './store/configureStore'
import {Provider} from 'react-redux'
// cookies provider
import {CookiesProvider} from 'react-cookie'


ReactDOM.render(
    <Provider store = {store}>
        <CookiesProvider>
            <Router>
                <App />
            </Router>
        </CookiesProvider>
    </Provider>
,document.getElementById('root'));
