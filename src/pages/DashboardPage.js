import React from 'react';
import {connect} from 'react-redux';
import Header from '../components/header/Header';
import Card from '../components/card/Card';
import CardChallenge from '../components/card/CardChallenge';
import {CompletedChallenge} from '../components/card/CompletedChallenge';
import {CompletedModal} from '../components/card/CompletedModal';
import CreateQuestButton from '../components/createQuestButton/createQuestButton';

const DashboardPage = ({nickname, todayCard}) => {

  return (
    <>
      <Header nickname={nickname}/>
      <Card todayCard={todayCard}/>
      <CardChallenge />
      <CompletedChallenge/>
      <CompletedModal/> 
      <CreateQuestButton/>
    </>
  );
};

const mapStateToProps = (state) => ({
  nickname: state.user.nickname,
  todayCard: state.dashboard.today
})




export default connect(mapStateToProps)(DashboardPage);
