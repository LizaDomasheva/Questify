import React from 'react';
import { connect, useDispatch } from 'react-redux';
import Header from '../components/header/Header';
import CardList from '../components/cardList/CardList';
import { useEffect, useState } from 'react';
import { getUser } from '../redux/operations';
import { createCard } from '../redux/dashboardOperations';
import CreateQuestButton from '../components/createQuestButton/CreateQuestButton';
import styled from './DashboardPage.module.css'

const DashboardPage = ({ nickname, todayCard, allTheRest, tomorrow, done }) => {
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
      <Header nickname={nickname} />
      <div className={styled.dashboard}>
      <h3 className={styled.title}>TODAY</h3>
      {todayCard.length > 0 && <CardList arr={todayCard} />}
      <h3 className={styled.title}>TOMORROW</h3>
      {tomorrow.length > 0 ? <CardList arr={tomorrow} /> : 'oooooooops!'}
      <h3 className={styled.title}>DONE</h3>
      {done.length > 0 ? <CardList arr={done} /> : 'ooooooooops!'}
      <h3 className={styled.title}>ALL THE REST</h3>
      {allTheRest.length > 0 && <CardList arr={allTheRest} />}
      </div>
      {/* <CardChallenge />
      <CompletedChallenge/>
      <CompletedModal/>  */}
      <CreateQuestButton onClick={createNewCard} />
      {/* <button onClick={() => createNewCard()}>CREATE NEW CARD</button> */}
    </>
    // <button onClick={() => createNewCard()}>CREATE NEW CARD</button>
  );
};

const mapStateToProps = state => ({
  nickname: state.user.nickname,
  todayCard: state.dashboard.today,
  allTheRest: state.dashboard.allTheRest,
  tomorrow: state.dashboard.tomorrow,
  done: state.dashboard.done
});

export default connect(mapStateToProps)(DashboardPage);
