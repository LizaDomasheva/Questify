import React, { useState } from 'react';
import styles from './Login.module.css';
import axios from 'axios';

const initialState = {
  nickname: '',
};

const loginURL = 'https://questify.goit.co.ua/api/login';

const Login = () => {
  const [state, setState] = useState(initialState);

  const submitHandler = e => {
    e.preventDefault();

    axios
      .post(loginURL, { nickname: state.nickname })
      .then(response => console.log('response = ', response.data.data))
      .catch(err => console.log('error = ', err));

    setState(initialState);
  };

  const changeHandler = ({ target: { name, value } }) => {
    setState(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.back}>
      <div className={styles.logo}></div>
      <h2 className={styles.slogan}>
        Questify will turn your life into a thrilling game full of amazing
        quests and exciting challenges.
      </h2>
      <form onSubmit={submitHandler}>
        <label className={styles.label}>
          Choose your name to sign up or log in
          <input
            className={styles.input}
            name="nickname"
            value={state.nickname}
            onChange={changeHandler}
          />
        </label>
        <button className={styles.button} label="Sign Up" type="submit">
          go!
        </button>
      </form>
      <div className={styles.container}></div>
    </div>
  );
};

export default Login;
