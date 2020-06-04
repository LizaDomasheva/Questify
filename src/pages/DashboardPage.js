import React from "react";
import { connect, useDispatch } from "react-redux";
import Header from "../components/header/Header";
import CardList from "../components/cardList/CardList";
import { useEffect, useState } from "react";
import { getUser } from "../redux/operations";
import { createCard } from "../redux/dashboardOperations";

const DashboardPage = ({ nickname, todayCard }) => {
  const [editFlag, seteditFlag] = useState(false);
  console.log("typeof(editFlag)", typeof editFlag);
  const dispatch = useDispatch();

  const createNewCard = () => {
    if (!editFlag) {
      dispatch(createCard());
      seteditFlag(true);
    }
    console.log("editFlag", editFlag);
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
