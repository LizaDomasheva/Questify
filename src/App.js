import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {LoginPage} from './pages/LoginPage';
import {DashboardPage} from './pages/DashboardPage';


function App() {
  return (
    <div >
      <h1>Questify</h1>
      {/* <Switch>
      <Route exact to='/login' component={LoginPage}/>
      <Route exact to='/dashboard' component={DashboardPage}/>
      </Switch> */}
    </div>
  );
}

export default App;
