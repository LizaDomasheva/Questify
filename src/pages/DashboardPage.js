import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
// import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/header/Header';
import CardList from '../components/cardList/CardList';
// import { useEffect, useState } from 'react';
import { postUser } from '../redux/operations';
import { createCard } from '../redux/dashboardOperations';
import CreateQuestButton from '../components/createQuestButton/CreateQuestButton';
import styled from './DashboardPage.module.css';


// const divStyle = {
//   transform:[{rotate:"180deg"}]
// }




const DashboardPage = ({ nickname, todayCard, allTheRest, tomorrow, done }) => {
  const history = useHistory();
  const [editFlag, seteditFlag] = useState(false);
  // console.log('typeof(editFlag)', typeof editFlag);
  // console.log('todayCard', todayCard);
  const dispatch = useDispatch();

  const createNewCard = () => {
    if (!editFlag) {
      dispatch(createCard());
      seteditFlag(true);
    }
    console.log('editFlag', editFlag);
  };

  useEffect(() => {
    dispatch(postUser(nickname));
    console.log('dash', nickname);
  }, []);

  const [isDoneFigure, setDoneFigure] = useState(false);

  const openList = () => {
    setDoneFigure(prev=>(!isDoneFigure));
  };


  return (
    <>
      <div className={styled.dashboard_wrapper}>
        <Header nickname={nickname} history={history} />
        <section className={styled.dashboard}>
          <p className={styled.title}>TODAY</p>
          {todayCard ? (
            <CardList arr={todayCard}/>
          ) : (
            <p className={styled.alert}>No quests or challenges for today</p>
          )}
        </section>
        <section className={styled.dashboard}>
          <p className={styled.title}>TOMORROW</p>
          {tomorrow ? <CardList arr={tomorrow} /> : <p className={styled.alert}>No quests or challenges for done</p>}
        </section>


        <section className={styled.dashboard}>      
            <div onClick={openList} className={isDoneFigure ? styled.doneFigure : styled.doneFigure__rotate}>
          <p className={isDoneFigure? styled.title:styled.title_color}>DONE</p>
              <div className={styled.doneLine}> 
              </div>
            </div>
            {isDoneFigure && 
              <CardList arr={done} />
            }
            
            
        </section>



        <section className={styled.dashboard}>
          <p className={styled.title}>ALL THE REST</p>
          {allTheRest.length > 0 && <CardList arr={allTheRest} />}
        </section>
      </div>
      <CreateQuestButton onClick={createNewCard} />
    </>
  );
};

const mapStateToProps = state => ({
  nickname: state.user.nickname,
  todayCard: state.dashboard.today,
  allTheRest: state.dashboard.allTheRest,
  tomorrow: state.dashboard.tomorrow,
  done: state.dashboard.done,
});

export default connect(mapStateToProps)(DashboardPage);
