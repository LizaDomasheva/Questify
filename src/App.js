import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';


function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/dashboard" component={DashboardPage} />
        <Redirect to="/" />
      </Switch>
      {/* <Header />
      <Card/>
      <CardChallenge/>
      <CompletedChallenge/>
      <CompletedModal/> */}
    </div>
  );
}

export default App;
