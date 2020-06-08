import axios from 'axios';
import { getUserId } from '../redux/selectors';
import { dashboardSlice } from '../redux/reducers/dashboardReducer';
import { filterDataTime } from './operations';
import moment from 'moment';
import easydate from 'easydate';

export const removeCard = _id => dispatch => {
  axios
    .delete(`https://questify.goit.co.ua/api/quests/${_id}`)
    .then(response => {
      console.log('response-delete', response);
      if (response.data.success) {
        console.log('id', _id);
        dispatch(dashboardSlice.actions.removeCardReducer(_id));
      }
    })
    .catch(err => console.warn(err));
};

export const createCard = () => (dispatch, getState) => {
  const userId = getUserId(getState());
  const newDate = new Date(Date.now());
  axios
    .post('https://questify.goit.co.ua/api/quests', {
      userId: userId,
      name: ' ',
      group: 'STUFF',
      difficulty: 'Easy',
      dueDate: `${newDate}`,
      isPriority: true,
    })
    .then(response => {
      // console.log('response', response);
      const tempData = { ...response.data.quest, isEdit: true };
      dispatch(dashboardSlice.actions.addCardReducer(tempData));
      //   console.log("response", tempData);
    })
    .catch(err => console.warn(err));
};

export const filterDataTimeTest = data => {
  let today = [];
  let tomorrow = [];
  let allTheRest = [];
  let done = [];

  console.log('data', data);
  const filtredData = data.reduce((acc, itemNew) => {
    const item = { ...itemNew, isEdit: false };
    const formatData = easydate('YMd', {
      setDate: `${item.dueDate}`,
      timeZone: 'utc',
    });
    const data = moment().calendar(`${formatData}`).slice(0, 6);
    // console.log('dataBeforeSwitch', data)
    switch (data) {
      case 'Today ':
        if (!item.done) {
          today.push(item);
          return (acc = { ...acc, today: today });
        } else {
          done.push(item);
          return (acc = { ...acc, done: done });
        }
      case 'Tomorr':
        item.done = true;
        done.push(item);
        return (acc = { ...acc, done: done });
      case 'Yester':
        if (!item.done) {
          tomorrow.push(item);
          return (acc = { ...acc, tomorrow: tomorrow });
        } else {
          done.push(item);
          return (acc = { ...acc, done: done });
        }
      default:
        if (!item.done) {
          allTheRest.push(item);
          return (acc = { ...acc, allTheRest: allTheRest });
        } else {
          done.push(item);
          return (acc = { ...acc, done: done });
        }
    }
  }, {});

  return filtredData;
};

export const changeCard = (_id, correctCardData) => dispatch => {
  axios
    .put(`https://questify.goit.co.ua/api/quests/${_id}`, correctCardData)
    .then(response => {
      console.log('response change', response.data.quest);
      // dispatch(dashboardSlice.actions.removeCardReducer(_id));
      return response;
    })
    .then(res => {
      console.log('res', res.data.quest);
      const newArr = [res.data.quest];
      const filterData = filterDataTimeTest(newArr);
      console.log('filterData', filterData);
      // dispatch(dashboardSlice.actions.filterCardReducerToday(filterData));
      // dispatch(dashboardSlice.actions.filterCardReducerTodayTemp(filterData));
      dispatch(dashboardSlice.actions.editCardReducer(filterData));
    })
    .catch(err => console.warn(err));
};

// export const changeCardNew = (_id, correctCardData) => dispatch => {
//   // axios
//   //   .put(`https://questify.goit.co.ua/api/quests/${_id}`, correctCardData)
//   //   .then(response => {
//   //     console.log('response change', response.data.quest);
//   //     // dispatch(dashboardSlice.actions.removeCardReducer(_id));
//   //     return response;
//   //   })
//   //   .then(res => {
//     const newId = Date.now();
//     console.log('My newId', newId);
//     const x ={...correctCardData, _id: newId};
//     console.log('My correctCardData with x = ', x)
//       console.log('My correctCardData = ', correctCardData)
//       // const newArr = [correctCardData];
//       const newArr = [x];
//       console.log('My newArr = ', newArr)
//       const filterData = filterDataTimeTest(newArr);
//       console.log('My filterData', filterData);
//       // dispatch(dashboardSlice.actions.filterCardReducerToday(filterData));
//       // dispatch(dashboardSlice.actions.filterCardReducerTodayTemp(filterData));
//       dispatch(dashboardSlice.actions.editCardReducerNew(filterData));
//     // })
//     // .catch(err => console.warn(err));
// };
