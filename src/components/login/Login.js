import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as session from '../../redux/operations';
import styles from './Login.module.css';

const initialState = {
  nickname: '',
};

const Login = ({ history }) => {
  const [state, setState] = useState(initialState);
  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(session.getUser({ ...state }));
    setState(initialState);
    history.push('/dashboard');
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
            type="text"
            name="nickname"
            minLength="3"
            maxLength="8"
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
