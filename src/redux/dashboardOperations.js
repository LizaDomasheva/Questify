import axios from 'axios';
import { getUserId } from '../redux/selectors';
import { dashboardSlice } from '../redux/reducers/dashboardReducer';

import moment from 'moment';
import easydate from 'easydate';

export const removeCard = _id => dispatch => {
  axios
    .delete(`https://questify.goit.co.ua/api/quests/${_id}`)
    .then(response => {
      if (response.data.success) {
        dispatch(dashboardSlice.actions.removeCardReducer(_id));
      }
    })
    .catch(err => console.warn(err));
};

export const createCard = () => async (dispatch, getState) => {
  try {
    const userId = getUserId(getState());
    const newDate = new Date(Date.now());
    await axios
      .post('https://questify.goit.co.ua/api/quests', {
        userId: userId,
        name: ' ',
        group: 'STUFF',
        difficulty: 'Easy',
        dueDate: `${newDate}`,
        isPriority: true,
      })
      .then(response => {
        const tempData = { ...response.data.quest, isEdit: true };
        dispatch(dashboardSlice.actions.addCardReducer(tempData));
      });
  } catch (err) {
    console.warn('back not work createCard', err);
  }
};

export const filterDataTimeTest = data => {
  let today = [];
  let tomorrow = [];
  let allTheRest = [];
  let done = [];

  const filtredData = data.reduce((acc, itemNew) => {
    const item = { ...itemNew, isEdit: false };
    const formatData = easydate('YMd', {
      setDate: `${item.dueDate}`,
      timeZone: 'utc',
    });
    let data = moment().calendar(`${formatData}`).slice(0, 6);
    const curData = Date.parse(new Date(itemNew.dueDate));
    const currentData = Date.now();
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    const momentData = hour * 3600 + minute * 60 + second;
    const deltaTime = currentData - momentData - curData - 86400000;
    if (deltaTime > 0) {
      data = 'tooOld';
    } 

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
        if (!item.done) {
          item.done = true;
          done.push(item);
          return (acc = { ...acc, done: done });
        } else {
          done.push(item);
          return (acc = { ...acc, done: done });
        }
      case 'Yester':
        if (!item.done) {
          tomorrow.push(item);
          return (acc = { ...acc, tomorrow: tomorrow });
        } else {
          done.push(item);
          return (acc = { ...acc, done: done });
        }
      case 'tooOld':
        if (!item.done) {
          item.done = true;
          done.push(item);
          return (acc = { ...acc, done: done });
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

export const changeCard = (_id, correctCardData) => async dispatch => {
  try {
    const res = await axios.put(
      `https://questify.goit.co.ua/api/quests/${_id}`,
      correctCardData,
    );
    let newArr = [res.data.quest];
    let filterData = filterDataTimeTest(newArr);
    const dataForReducer = {
      today: [],
      tomorrow: [],
      done: [],
      allTheRest: [],
      ...filterData,
    };
    dispatch(dashboardSlice.actions.removeCardReducer(_id));
    dispatch(dashboardSlice.actions.editCardReducer(dataForReducer));
  } catch (err) {
    console.log(err);
  }
};

export const startChallenge = _id => async dispatch => {
  try {
     await axios
      .put(`https://questify.goit.co.ua/api/challenges/${_id}`, {
        updateFields: { challengeSendToUser: true },
      })
      .then(response => {
        const startArr = [response.data.challenge];
        let filterData = filterDataTimeTest(startArr);
        const dataForReducer = {
          today: [],
          tomorrow: [],
          done: [],
          allTheRest: [],
          ...filterData,
        };
        dispatch(dashboardSlice.actions.removeCardReducer(_id));
        dispatch(dashboardSlice.actions.editCardReducer(dataForReducer));
      });
  } catch (err) {
    console.log(err);
  }
};

export const deleteChallenge = (_id, userId) => async dispatch => {
  try {
     await axios
      .put(`https://questify.goit.co.ua/api/challenges/${_id}`, {
        updateFields: { challengeSendToUser: false },
        userId: `${userId}`,
      })
      .then(response => {
        dispatch(dashboardSlice.actions.removeCardReducer(_id));
      });
  } catch (err) {
    console.log(err);
  }
};

export const doneChallenge = (_id, userId) => async dispatch => {

  try {
     await axios
      .put(`https://questify.goit.co.ua/api/challenges/${_id}`, {
        updateFields: { challengeSendToUser: true, done: true },
        userId: `${userId}`,
      })
      .then(response => {
        const startArr = [response.data.challenge];
        let filterData = filterDataTimeTest(startArr);
        const dataForReducer = {
          today: [],
          tomorrow: [],
          done: [],
          allTheRest: [],
          ...filterData,
        };
        dispatch(dashboardSlice.actions.removeCardReducer(_id));
        dispatch(dashboardSlice.actions.editCardReducer(dataForReducer));
      });
  } catch (err) {
    console.log(err);
  }
};

export const editChallenge = (
  _id,
  correctCardData,
  difficulty,
) => async dispatch => {
  try {
   await axios
      .put(`https://questify.goit.co.ua/api/challenges/${_id}`, {
        updateFields: {
          difficulty: difficulty,
          challengeSendToUser: true,
          dueDate: correctCardData,
        },
      })
      .then(response => {
        const startArr = [response.data.challenge];
        let filterData = filterDataTimeTest(startArr);
        const dataForReducer = {
          today: [],
          tomorrow: [],
          done: [],
          allTheRest: [],
          ...filterData,
        };
        dispatch(dashboardSlice.actions.removeCardReducer(_id));
        dispatch(dashboardSlice.actions.editCardReducer(dataForReducer));
      });
  } catch (err) {
    console.log(err);
  }
};
