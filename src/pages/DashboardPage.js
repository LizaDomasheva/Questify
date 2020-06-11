import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Header from "../components/header/Header";
import CardList from "../components/cardList/CardList";
// import { useEffect, useState } from 'react';
import { postUser } from "../redux/operations";
import { createCard } from "../redux/dashboardOperations";
import CreateQuestButton from "../components/createQuestButton/CreateQuestButton";
import styled from "./DashboardPage.module.css";
import CardEditing from "../components/card/cardEditing/CardEditing";


// const divStyle = {
//   transform:[{rotate:"180deg"}]
// }

const DashboardPage = ({ nickname, todayCard, allTheRest, tomorrow, done }) => {
  // useEffect(() => {
  //   window.scrollTo(
  //     {
  //       top: 0,
  //       behavior: "smooth",
  //     },
  //     []
  //   );
  // });

  const history = useHistory();
  const [editFlag, seteditFlag] = useState(false);
  const [startFlag, setstartFlag] = useState(false);
  const dispatch = useDispatch();

  const resetEditFlag = () => {
    seteditFlag(false);
  };

  const setEditFlagTrue = () => {
    seteditFlag(true);
  };

  const createNewCard = () => {
    if (!editFlag) {
      dispatch(createCard());
      seteditFlag(true);
      console.log("editFlag", editFlag);
    }
    setstartFlag(true);
    console.log('startFlag', startFlag)
  };
  
  const resetStartFlag = () => {
    setstartFlag(false);
    resetEditFlag();
  };

  useEffect(() => {
    dispatch(postUser(nickname));
    //   window.scrollTo({
    //     top: 0,
    //     behavior: "smooth"
    // });
  }, []);

  const [isDoneFigure, setDoneFigure] = useState(false);

  const openList = () => {
    setDoneFigure((prev) => !isDoneFigure);
  };

  return (
    <>
      <div className={styled.dashboard_wrapper}>
          {/* <Loading/> */}
        <Header nickname={nickname} history={history} allTheRest={allTheRest} todayCard={todayCard} tomorrow={tomorrow} />
        <section className={styled.dashboard}>
          <p className={styled.title}>TODAY</p>
          {/* {editFlag && <CardEditing arr={todayCard}/>} */}
          {todayCard ? (
            <CardList
              arr={todayCard}
              editFlag={editFlag}
              resetEditFlag={resetEditFlag}
              setEditFlagTrue={setEditFlagTrue}
              startFlag={startFlag}
              resetStartFlag={resetStartFlag}
            />
          ) : (
            <p className={styled.alert}>No quests or challenges for today</p>
          )}
        </section>
        <section className={styled.dashboard}>
          <p className={styled.title}>TOMORROW</p>
          {tomorrow ? (

            <CardList
              arr={tomorrow}
              editFlag={editFlag}
              resetEditFlag={resetEditFlag}
              setEditFlagTrue={setEditFlagTrue}
              resetStartFlag={resetStartFlag}
            />

          ) : (
            <p className={styled.alert}>No quests or challenges for done</p>
          )}
        </section>

        <section className={styled.dashboard}>
          <div
            onClick={openList}
            className={
              isDoneFigure ? styled.doneFigure : styled.doneFigure__rotate
            }
          >
            <p className={isDoneFigure ? styled.title : styled.title_color}>
              DONE
            </p>
            <div className={styled.doneLine}></div>
          </div>
          {isDoneFigure && (
            <CardList
              arr={done}
              editFlag={editFlag}
              resetEditFlag={resetEditFlag}
              setEditFlagTrue={setEditFlagTrue}
              resetStartFlag={resetStartFlag}
            />
          )}
        </section>

        <section className={styled.dashboard}>
          <p className={styled.title}>ALL THE REST</p>
          {allTheRest && (
            <CardList
              arr={allTheRest}
              editFlag={editFlag}
              resetEditFlag={resetEditFlag}
              setEditFlagTrue={setEditFlagTrue}
              resetStartFlag={resetStartFlag}
            />
          )}
        </section>
      </div>
      <CreateQuestButton onClick={createNewCard} />
    </>
  );
};

const mapStateToProps = (state) => ({
  nickname: state.user.nickname,
  todayCard: state.dashboard.today,
  allTheRest: state.dashboard.allTheRest,
  tomorrow: state.dashboard.tomorrow,
  done: state.dashboard.done,
  challengeSendToUser: state.challengeSendToUser,
});

export default connect(mapStateToProps)(DashboardPage);
