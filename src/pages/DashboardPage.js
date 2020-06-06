import React from 'react';
import { connect, useDispatch } from 'react-redux';
import Header from '../components/header/Header';
import CardList from '../components/cardList/CardList';
import { useEffect, useState } from 'react';
import { getUser } from '../redux/operations';
import { createCard } from '../redux/dashboardOperations';
import CreateQuestButton from '../components/createQuestButton/CreateQuestButton';
import styled from './DashboardPage.module.css'

const DashboardPage = ({ nickname, todayCard, allTheRest }) => {
  const [editFlag, seteditFlag] = useState(false);
  console.log('typeof(editFlag)', typeof editFlag);
  const dispatch = useDispatch();

  const createNewCard = () => {
    if (!editFlag) {
      dispatch(createCard());
      seteditFlag(true);
    }
    console.log('editFlag', editFlag);
  };

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <>
    <div className={styled.dashboard_wrapper}>
      <Header nickname={nickname} />
      <section className={styled.dashboard}>
          <p className={styled.title}>TODAY</p>
          {/* <p className={styled.alert}>No quests or challenges for today</p> */}
      {todayCard.length > 0 ? <CardList arr={todayCard}/>:<p className={styled.alert}>No quests or challenges for today</p>}
      </section>
      <section className={styled.dashboard}>
          <p className={styled.title}>TOMORROW</p>
      </section>
      <section className={styled.dashboard}>
          <p className={styled.title}>DONE</p>
      </section>
      <section className={styled.dashboard}>
          <p className={styled.title}>ALL THE REST</p>
      {allTheRest.length > 0 && <CardList arr={allTheRest} />}
      </section>
    
      <CreateQuestButton onClick={createNewCard} />
      {/* <button onClick={() => createNewCard()}>CREATE NEW CARD</button> */}
      </div>
    </>
    // <button onClick={() => createNewCard()}>CREATE NEW CARD</button>
  );
};

const mapStateToProps = state => ({
  nickname: state.user.nickname,
  todayCard: state.dashboard.today,
  allTheRest: state.dashboard.allTheRest,
});

export default connect(mapStateToProps)(DashboardPage);
