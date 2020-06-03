import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {LoginPage} from './pages/LoginPage';
import {DashboardPage} from './pages/DashboardPage';

import Header from './components/header/Header'

import Card from './components/card/Card'
import CardChallenge from './components/card/CardChallenge'



function App() {
  return (
    <div >
      <Header />
      <Card/>
      <CardChallenge/>
    </div>
  );
}

export default App;
