import React from 'react';
import axios from 'axios';

// axios.defaults.baseURL = 'https://questify.goit.co.ua/api/';

const loginURL = 'https://questify.goit.co.ua/api/login';
const testName = 'zsert';

const getURL = 'https://questify.goit.co.ua/api/quests';

const postURL = 'https://questify.goit.co.ua/api/quests';
const testPost = {
  name: 'Test for delete at 00:38',
  group: 'Bootcamp19',
  difficulty: 'Easy',
  dueDate: 13289184823,
  done: false,
  isQuest: true,
  challengeSendToUser: false,
  // userId: "5ed6a069db780d491967e820",
  userId: "5ed6c5794700db2c59626ebe",  
};

const getURL1 = 'https://questify.goit.co.ua/api/quests?userId=5ed6a069db780d491967e820';

// const deleteURL = "https://questify.goit.co.ua/api/quests/{questId}";
const deleteURL = "https://questify.goit.co.ua/api/quests/5ed6c07a4700db2c59626ebb";

const LoginPage = () => {

  // --== Login ==--
  // axios
  //   .post(loginURL, {"nickname": testName})
  //   .then(response => console.log('response = ', response.data.data))
  //   .catch(err => console.log('error = ', err));

  // --== Get ==--
  // axios
  //   .get(getURL)
  //   .then(response => console.log('response = ', response))
  //   .catch(err => console.log('error = ', err));

  // --== Post ==--
  // axios
  // .post(postURL, testPost)
  // .then(response => console.log('response = ', response))
  // .catch(err => console.log('error = ', err));

   // --== Get1 ==--
  // axios
  // .get(getURL1)
  // .then(response => console.log('response = ', response))
  // .catch(err => console.log('error = ', err));

   // --== Delete ==--
  // axios
  // .delete(deleteURL)
  // .then(response => console.log('response = ', response))
  // .catch(err => console.log('error = ', err));

  return <h1>LoginPage</h1>;
};

export default LoginPage;


// "user": {
//   "_id": "5ed746a94700db2c59626f1d",
//   "nickname": "testname",
//   "dashboard": "5ed746a94700db2c59626f1e",
//   "createdAt": "2020-06-03T06:43:53.705Z",
//   "updatedAt": "2020-06-03T06:43:53.705Z",
//   "__v": 0
// }