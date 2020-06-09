import axios from "axios";
import { getUserId } from "../redux/selectors";
import { dashboardSlice } from "../redux/reducers/dashboardReducer";
// import { filterDataTime } from "./operations";
import moment from "moment";
import easydate from "easydate";

export const removeCard = (_id) => (dispatch) => {
  axios
    .delete(`https://questify.goit.co.ua/api/quests/${_id}`)
    .then((response) => {
      console.log("response-delete", response);
      if (response.data.success) {
        // console.log("id", _id);
        dispatch(dashboardSlice.actions.removeCardReducer(_id));
      }
    })
    .catch((err) => console.warn(err));
};

export const createCard = () => (dispatch, getState) => {
  // console.log("getState :>> ", getState);
  const userId = getUserId(getState());
  const newDate = new Date(Date.now());
  axios
    .post("https://questify.goit.co.ua/api/quests", {
      userId: userId,
      name: " ",
      group: "STUFF",
      difficulty: "Easy",
      dueDate: `${newDate}`,
      isPriority: true,
    })
    .then((response) => {
      const tempData = { ...response.data.quest, isEdit: true };
      dispatch(dashboardSlice.actions.addCardReducer(tempData));
    })
    .catch((err) => console.warn("back not work", err));
};

export const filterDataTimeTest = (data) => {
  let today = [];
  let tomorrow = [];
  let allTheRest = [];
  let done = [];

  // console.log('data', data);
  const filtredData = data.reduce((acc, itemNew) => {
    const item = { ...itemNew, isEdit: false };
    const formatData = easydate("YMd", {
      setDate: `${item.dueDate}`,
      timeZone: "utc",
    });
    let data = moment().calendar(`${formatData}`).slice(0, 6);
    // const data1 = moment().calendar(`${formatData}`);
    // console.log("data1", data1);
    const curData = Date.parse(new Date(itemNew.dueDate));
    const currentData = Date.now();
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    const momentData = hour * 3600 + minute * 60 + second;
    const deltaTime = currentData - momentData - curData - 86400000;
    if (deltaTime > 0) {
      data = "tooOld";
      // console.log('data', data);
    } else console.log("ops", "ooooops");
    // console.log('deltaTime', deltaTime)
    // console.log('itemNew.dueDate :>> ', itemNew.dueDate);
    // console.log('dueData', dueDate)
    // console.log('dueData', curData)
    // console.log('currentData', currentData)
    // console.log('momentData', momentData)
    // console.log('dataBeforeSwitch', data)
    // console.log('moment :>> ', moment().startOf('day').fromNow());

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
          item.done = true;
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
      case "tooOld":
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

// export const changeCard = (_id, correctCardData) => (dispatch, getState) => {
//   axios
//     .put(`https://questify.goit.co.ua/api/quests/${_id}`, correctCardData)
//     // .then((response) => {
//     //   console.log("response change", response.data.quest);
//   dispatch(dashboardSlice.actions.removeCardReducer(_id));
//     //   return response;
//     // })
//     .then((res) => {
//       console.log("res", res.data.quest);
//       const newArr = [res.data.quest];
//       const filterData = filterDataTimeTest(newArr);
//       console.log("filterData", filterData);
//       // dispatch(dashboardSlice.actions.filterCardReducerToday(filterData));
//       // dispatch(dashboardSlice.actions.filterCardReducerTodayTemp(filterData));
//       dispatch(dashboardSlice.actions.editCardReducer(filterData));
//     })
//     .catch((err) => console.warn(err));
// };

export const changeCard = (_id, correctCardData) => async (dispatch) => {
  try {
    const res = await axios.put(
      `https://questify.goit.co.ua/api/quests/${_id}`,
      correctCardData
    );
    // console.log("correctCardData :>> ", correctCardData);
    console.log("res edit :>> ", res);
    let newArr = [res.data.quest];
    // console.log("type of", typeof newArr);
    let filterData = filterDataTimeTest(newArr);
    // console.log("filterData", filterData);
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
