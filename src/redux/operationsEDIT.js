import { userSlice } from "./reducers/userReducer";
import axios from "axios";
import storage from "redux-persist/lib/storage";
import easydate from "easydate";
import moment from "moment";
import * as selectors from "./selectors";
import { dashboardSlice } from "./reducers/dashboardReducer";

// const loginURL = 'https://develop-questify.goit.co.ua/api/auth';
const loginURL = "https://questify.goit.co.ua/api/login";

const filterDataDone = (data) => {
  const filtredData = data.filter((item) => item.done);

  return filtredData;
};

export const filterDataTime = (data) => {
  let today = [];
  let tomorrow = [];
  let allTheRest = [];
  let done = [];

  console.log("data", data);
  const filtredData = data.reduce((acc, itemNew) => {
    const item = { ...itemNew, isEdit: false };
    const formatData = easydate("YMd", {
      setDate: `${item.dueDate}`,
      timeZone: "utc",
    });
    const data = moment().calendar(`${formatData}`).slice(0, 6);
    const data1 = moment().calendar(`${formatData}`);
    // console.log("data1", data1);
    // const curData = Date.now(itemNew.dueDate)
    // const currentData = Date.now()
    // const momentData = Date.now(moment().startOf('day').fromNow())
    // const deltaTime = currentData - momentData - curData - 86400000
    // if (deltaTime < 0) {
    //   data = 'tooOld'
    //   console.log('data', data)
    // } else console.log('ops', "ooooops")
    // console.log('deltaTime', deltaTime)
    // console.log('curData', curData)
    // console.log('currentData', currentData)
    // console.log('momentData', momentData)
    // console.log('dataBeforeSwitch', data)

    switch (data) {
      case "Today ":
        if (!item.done) {
          today.push(item);
          return (acc = { ...acc, today: today });
        } else {
          done.push(item);
          return (acc = { ...acc, done: done });
        }
      case "Tomorr":
        if (!item.done) {
          done.push(item);
          return (acc = { ...acc, done: done });
        } else {
          done.push(item);
          return (acc = { ...acc, done: done });
        }
      case "Yester":
        if (!item.done) {
          tomorrow.push(item);
          return (acc = { ...acc, tomorrow: tomorrow });
        } else {
          done.push(item);
          return (acc = { ...acc, done: done });
        }
      // return (acc = { ...acc, tomorrow: tomorrow });
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

export const getUser = (nickname) => (dispatch, getState) => {
  console.log("nickname getUser", nickname);
  axios
    .post(loginURL, nickname)
    .then((response) => {
      console.log("response get User = ", response.data.data.tasks);
      dispatch(userSlice.actions.loginUser(response.data.data.user));
      // const filterDone = filterDataDone(response.data.data.tasks);
      const filterTime = filterDataTime(response.data.data.tasks);
      console.log("filterTime :>> ", filterTime);
      // dispatch(dashboardSlice.actions.filterCardReducer(filterDone));
      dispatch(dashboardSlice.actions.filterCardReducerTodayTemp(filterTime));
    })
    .catch((err) => console.log("error25 = ", err));
};

export const postUser = (nickname) => (dispatch, getState) => {
  // const name = selectors.getUser(getState());
  console.log(typeof nickname);
  axios
    .post(loginURL, { nickname: `${nickname}` })
    .then((response) => {
      console.log(response);
      dispatch(userSlice.actions.loginUser(response.data.data.user));
      const filterDone = filterDataDone(response.data.data.tasks);
      const filterTime = filterDataTime(response.data.data.tasks);
      console.log("filterTime :>> ", filterTime);
      dispatch(dashboardSlice.actions.filterCardReducer(filterDone));
      dispatch(dashboardSlice.actions.filterCardReducerToday(filterTime));
    })
    .catch((err) => console.log("error = ", err));
};

// export const deleteCard = (id) => (dispatch) => {
//   axios.delete(`https://develop-questify.goit.co.ua/api/quests/${id}`)
// }
