import React from "react";
import { connect, useDispatch } from "react-redux";
import Header from "../components/header/Header";
import CardList from "../components/cardList/CardList";
import { useEffect } from "react";
import { getUser } from "../redux/operations";
import { createCard } from "../redux/dashboardOperations";

const DashboardPage = ({ nickname, todayCard }) => {
  // console.log('todayCard', todayCard)
  const dispatch = useDispatch();
  const createNewCard = () => {
    dispatch(createCard());
  };
  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <>
      <Header nickname={nickname} />
      {todayCard.length > 0 && <CardList todayCard={todayCard} />}
      {/* <CardChallenge />
      <CompletedChallenge/>
      <CompletedModal/>  */}
      <button onClick={() => createNewCard()}>CREATE NEW CARD</button>
    </>
  );
};

const mapStateToProps = (state) => ({
  nickname: state.user.nickname,
  todayCard: state.dashboard.today,
});

export default connect(mapStateToProps)(DashboardPage);
