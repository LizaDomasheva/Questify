import axios from "axios";

export const deleteCard = (id) => (dispatch) => {
  axios
    .delete(`https://develop-questify.goit.co.ua/api/quests/:${id}`)
    .then((response) => console.log("response", response));
};
