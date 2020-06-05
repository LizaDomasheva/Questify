import React from 'react';
// import { connect, useDispatch } from 'react-redux';
import Header from '../components/header/Header';
import Card from '../components/card/Card';
import CardChallenge from '../components/card/CardChallenge';
// import * as sessionOperations from '../redux/operations';
// import * as sessionSelectors from '../redux/selectors';

// const DashboardPage = ({ nickname, todayCard, refreshCurrentUser }) => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(refreshCurrentUser(nickname));
//   }, []);

//   return (
//     <>
//       <Header nickname={nickname} />
//       <Card todayCard={todayCard} />
//       <CardChallenge />
//       {/* <CompletedChallenge /> */}
//       {/* <CompletedModal /> */}
//       {/* <CreateQuestButton /> */}
//     </>
//   );
// };

// const mapStateToProps = state => ({
//   nickname: state.user.nickname,
//   todayCard: state.dashboard.today,
// });

// const mapDispatchToProps = {
//   refreshCurrentUser: sessionOperations.postUser,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);

const DashboardPage = () => {
  return (
    <>
      <Header />
      <Card />
      <CardChallenge />
    </>
  );
};

export default DashboardPage;
