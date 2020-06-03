import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {Provider} from 'react-redux';
import './stylesheet/main.css';
import App from './App';
import { store } from './redux/store';


ReactDOM.render(
  <Provider store={store}>
 <Router>
   <Route component={App}/>
    </Router>
    </Provider>,
  document.getElementById('root')
);


