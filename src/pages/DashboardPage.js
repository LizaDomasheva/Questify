import React from 'react';
import Header from '../components/header/Header';
import Card from '../components/card/Card';
import CardChallenge from '../components/card/CardChallenge';
import {CompletedChallenge} from '../components/card/CompletedChallenge';
import {CompletedModal} from '../components/card/CompletedModal';

const DashboardPage = () => {
  return (
    <>
      <Header />
      <Card />
      <CardChallenge />
      <CompletedChallenge/>
      <CompletedModal/> 
    </>
  );
};

export default DashboardPage;
