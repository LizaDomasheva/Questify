import axios from "axios";
import { getUserId } from "../redux/selectors";
import { dashboardSlice } from "../redux/reducers/dashboardReducer";

export const removeCard = (_id) => (dispatch) => {
  axios
    .delete(`https://questify.goit.co.ua/api/quests/${_id}`)
    .then((response) => {
      console.log("response-delete", response);
      if (response.data.success) {
        console.log("id", _id);
        dispatch(dashboardSlice.actions.removeCardReducer(_id));
      }
    })
    .catch((err) => console.warn(err));
};

export const createCard = () => (dispatch, getState) => {
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
      //   console.log("response", tempData);
    })
    .catch((err) => console.warn(err));
};

export const changeCard = (_id, cardState) => (dispatch) => {
  axios
    .put(`https://questify.goit.co.ua/api/quests/${_id}`, cardState)
    .then((response) => console.log("response", response.data.quest))
    .catch((err) => console.warn(err));
};
