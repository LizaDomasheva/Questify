import React from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';
import {LoginPage} from './pages/LoginPage';
import {DashboardPage} from './pages/DashboardPage';
import Header from './components/header/Header'
import Card from './components/card/Card'
import CardChallenge from './components/card/CardChallenge'
import { CompletedChallenge } from './components/card/CompletedChallenge';
import { CompletedModal } from './components/card/CompletedModal';




function App() {
  return (
    <div >
      <Switch>
        <Route exact path='/' component={LoginPage}/>
        <Route exact path='/dashboard' component={DashboardPage}/>
        <Redirect to='/'/>
      </Switch>
      <Header />
      <Card/>
      <CardChallenge/>
      <CompletedChallenge/>
      <CompletedModal/>
    </div>
  );
}

export default App;
