import { userSlice } from './reducers/userReducer';
import axios from 'axios';
import storage from 'redux-persist/lib/storage';
import * as selectors from './selectors';

const loginURL = 'https://develop-questify.goit.co.ua/api/auth';

const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const getUser = nickname => (dispatch, getState) => {
  axios
    .post(loginURL, nickname)
    .then(response => {
      console.log('response = ', response);
      dispatch(userSlice.actions.loginUser(response.data.data.user));
      const nickname2 = selectors.getUser(getState());
      console.log(nickname2);
    })
    .catch(err => console.log('error = ', err));
};

export const postUser = () => (dispatch, getState) => {
  console.log(getState());
  const token = selectors.getToken(getState());
  console.log(token);
  const name = selectors.getUser(getState());
  console.log(typeof name);
  // if (!nickname) {
  //   return;
  // }
  // userSlice.actions.refreshUser();
  // setAuthToken(token);
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axios
    .post(
      'https://develop-questify.goit.co.ua/api/user/me',
      {
        nickname: 'nata',
      },
      options,
    )
    .then(response => {
      console.log('response = ', response);

      dispatch(userSlice.actions.refreshUser(response.data.data.success));
    })
    .catch(err => console.log('error = ', err));
  userSlice.actions.refreshUser();
};
