import { userSlice } from './reducers/userReducer';
import axios from 'axios';
import storage from 'redux-persist/lib/storage';
import * as selectors from './selectors';

const loginURL = 'https://develop-questify.goit.co.ua/api/auth';

const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const getUser = nickname => dispatch => {
  axios
    .post(loginURL, nickname)
    .then(response => {
      console.log('response = ', response);
      dispatch(userSlice.actions.loginUser(response.data.data.user));
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
