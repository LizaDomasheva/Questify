import axios from "axios";
import { getUserId } from "../redux/selectors";
import { dashboardSlice } from "../redux/reducers/dashboardReducer";
import { filterDataTime } from "./operations";
import moment from "moment";
import easydate from "easydate";

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

// export const filterDataTimeTest = (data) => {
//   let today = [];
//   let tomorrow = [];
//   let allTheRest = [];
//   let doneNew = [];

//   const filtredData = data.reduce((acc, itemNew) => {
//     const item = { ...itemNew, isEdit: false };
//     const formatData = easydate("YMd", {
//       setDate: `${item.dueDate}`,
//       timeZone: "utc",
//     });
//     const data = moment().calendar(`${formatData}`).slice(0, 6);
//     switch (data) {
//       case "Today ":
//         if (!item.done) {
//           today.push(item);
//         }
//         return (acc = { ...acc, today: today });
//       case "Tomorr":
//         if (!item.done) {
//           doneNew.push(item);
//         }
//         return (acc = { ...acc, doneNew: doneNew });
//       case "Yester":
//         if (!item.done) {
//           tomorrow.push(item);
//         }
//         return (acc = { ...acc, tomorrow: tomorrow });
//       default:
//         if (!item.done) {
//           allTheRest.push(item);
//         }
//         return (acc = { ...acc, allTheRest: allTheRest });
//     }
//   }, {});

//   return filtredData;
// };

export const changeCard = (_id, correctCardData) => (dispatch) => {
  axios
    .put(`https://questify.goit.co.ua/api/quests/${_id}`, correctCardData)
    .then((response) => {
      console.log("response", response.data.quest);
      // dispatch(dashboardSlice.actions.removeCardReducer(_id));
      return response;
    })
    .then((res) => {
      console.log("res", res);
      const newArr = [res.data.quest];
      const filterData = filterDataTime(newArr);
      console.log("filterData", filterData);
      dispatch(dashboardSlice.actions.filterCardReducerToday(filterData));
    })
    .catch((err) => console.warn(err));
};
