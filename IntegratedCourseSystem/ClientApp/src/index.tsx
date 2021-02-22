import 'bootstrap/dist/css/bootstrap.css';

// react and react-dom imports
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'

// main component
import App from './components/App';

// react-redux and redux imports
import configureStore from './store/configureStore'
import {Provider} from 'react-redux'

const store = configureStore()

ReactDOM.render(
    <Provider store = {store}>
        <Router>
            <App />
        </Router>
    </Provider>
,document.getElementById('root'));
