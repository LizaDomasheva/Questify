import { connect } from 'react-redux';

const findId = ({ cardId, todayCard, allTheRest, tomorrow, done }) => {
  

};

const removeCardfromArr = (arr, id) => {
  arr.filter(item => item.id !== id);
};


const mapStateToProps = state => ({
  todayCard: state.dashboard.today,
  allTheRest: state.dashboard.allTheRest,
  tomorrow: state.dashboard.tomorrow,
  done: state.dashboard.done
});

export default connect(mapStateToProps)(findId);