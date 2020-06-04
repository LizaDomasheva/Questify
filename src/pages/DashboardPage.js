import React from 'react';
import {connect} from 'react-redux';
import Header from '../components/header/Header';
import Card from '../components/card/Card';
import CardChallenge from '../components/card/CardChallenge';
import {CompletedChallenge} from '../components/card/CompletedChallenge';
import {CompletedModal} from '../components/card/CompletedModal';

const DashboardPage = ({nickname}) => {

  return (
    <>
      <Header nickname={nickname}/>
      <Card />
      <CardChallenge />
      <CompletedChallenge/>
      <CompletedModal/> 
    </>
  );
};

const mapStateToProps = (state) => ({
  nickname: state.user.nickname
})




export default connect(mapStateToProps)(DashboardPage);
