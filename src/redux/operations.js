import { userSlice } from './reducers/userReducer';
import axios from 'axios';
import storage from 'redux-persist/lib/storage';
import easydate from 'easydate';
import moment from 'moment';
import * as selectors from './selectors';
import { dashboardSlice } from './reducers/dashboardReducer';

const loginURL = 'https://develop-questify.goit.co.ua/api/auth';

const filterDataDone = data => {
  const filtredData = data.filter(item => item.done);
  return filtredData;
};

const filterDataTime = data => {
  let today = [];
  let tomorrow = [];
  let allTheRest = [];
  let doneNew = [];
  const filtredData = data.reduce((acc, item) => {
    const formatData = easydate('YMd', {
      setDate: `${item.dueDate}`,
      timeZone: 'utc',
    });
    const data = moment().calendar(`${formatData}`).slice(0, 6);
    switch (data) {
      case 'Today ':
        if (!item.done) {
        console.log('item :>> ', item);
        today.push(item)}
        return (acc = { ...acc, today: today });
      case 'Tomorr':
        if (!item.done) {
        doneNew.push(item)}
        return (acc = { ...acc, doneNew: doneNew });
      case 'Yester':
        if (!item.done) {
        tomorrow.push(item)}
        return (acc = { ...acc, tomorrow: tomorrow });
      default:
        if (!item.done) {
          allTheRest.push(item);
        }
        return (acc = { ...acc, allTheRest: allTheRest });
    }
  }, {});
  console.log('filtredData :>> ', filtredData);
  return filtredData;
};

const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const getUser = nickname => dispatch => {
  axios
    .post(loginURL, nickname)
    .then(response => {
      console.log('response = ', response.data.data.tasks);
      dispatch(userSlice.actions.loginUser(response.data.data.user));
      const filterDone = filterDataDone(response.data.data.tasks);
      const filterTime = filterDataTime(response.data.data.tasks);
      console.log('filterTime :>> ', filterTime);
      dispatch(dashboardSlice.actions.filterCardReducer(filterDone));
      dispatch(dashboardSlice.actions.filterCardReducerToday(filterTime));
    })
    .catch(err => console.log('error = ', err));
  userSlice.actions.loginUser();
};
console.log(storage.getItem('user'));

export const postUser = () => (dispatch, getState) => {
  const token = selectors.getToken(getState());

  if (!token) {
    return;
  }

  setAuthToken(token);
  axios
    .post('https://develop-questify.goit.co.ua//api/user/me')
    .then(response => {
      console.log('response = ', response.data.data.user);
      //   setAuthToken(response.data.data.user.token);
      dispatch(userSlice.actions.loginUser(response.data.data.user));
    })
    .catch(err => console.log('error = ', err));
  userSlice.actions.loginUser();
};
