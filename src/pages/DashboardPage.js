import React from 'react';
import { connect, useDispatch } from 'react-redux';
import Header from '../components/header/Header';
import CardList from '../components/cardList/CardList';
import { useEffect, useState } from 'react';
import { getUser } from '../redux/operations';
import { createCard } from '../redux/dashboardOperations';

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
      <Header nickname={nickname} />
      <h2>Today</h2>
      {todayCard.length > 0 && <CardList arr={todayCard} />}
      <h2>allTheRest</h2>
      {allTheRest.length > 0 && <CardList arr={allTheRest} />}

      {/* <CardChallenge />
      <CompletedChallenge/>
      <CompletedModal/>  */}
      <button onClick={() => createNewCard()}>CREATE NEW CARD</button>
   </>
  );
};

const mapStateToProps = state => ({
  nickname: state.user.nickname,
  todayCard: state.dashboard.today,
  allTheRest: state.dashboard.allTheRest,
});

export default connect(mapStateToProps)(DashboardPage);
