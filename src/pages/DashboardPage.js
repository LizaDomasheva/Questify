import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/header/Header';
import CardList from '../components/cardList/CardList';
import { getUser } from '../redux/operations';
import { createCard } from '../redux/dashboardOperations';
import CreateQuestButton from '../components/createQuestButton/CreateQuestButton';
import styled from './DashboardPage.module.css'

const DashboardPage = ({ nickname, todayCard, allTheRest, tomorrow, done }) => {
  const history = useHistory()
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
      <Header nickname={nickname} history={history}/>
      <section className={styled.dashboard}>
          <p className={styled.title}>TODAY</p>
      {todayCard.length > 0 ? <CardList arr={todayCard}/> : <p className={styled.alert}>No quests or challenges for today</p>}
      </section>
      <section className={styled.dashboard}>
          <p className={styled.title}>TOMORROW</p>
      {/* {tomorrow.length > 0 ? <CardList arr={tomorrow} /> : 'oooooooops!'} */}
      </section>
      <section className={styled.dashboard}>
          <p className={styled.title}>DONE</p>
      {done.length > 0 ? <CardList arr={done} /> : <p className={styled.alert}>No quests or challenges for done</p>}
      </section>
      <section className={styled.dashboard}>
          <p className={styled.title}>ALL THE REST</p>
      {allTheRest.length > 0 && <CardList arr={allTheRest} />}
      </section>
    </div>
    <CreateQuestButton onClick={createNewCard} />
    </>
  )
}

const mapStateToProps = state => ({
  nickname: state.user.nickname,
  todayCard: state.dashboard.today,
  allTheRest: state.dashboard.allTheRest,
  tomorrow: state.dashboard.tomorrow,
  done: state.dashboard.done
});

export default connect(mapStateToProps)(DashboardPage);