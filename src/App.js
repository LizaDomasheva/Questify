import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage';
import  LoginPage from './pages/LoginPage';

function App() {
  return (
    <div>
      <h1>App</h1>
      <Switch>
        <Route path='/login' component={LoginPage} />
        <Route path='/dashboard' component={DashboardPage} />
        <Redirect to='/login' />
      </Switch>
    </div>
  );
}

export default App;
