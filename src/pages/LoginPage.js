import React from 'react';
import Login from '../components/login/Login';
import { useHistory } from 'react-router-dom';
// import styles from './LoginPage.module.css';

const LoginPage = () => {
  const history = useHistory();

  return (
    <main>
      <Login history={history} />
    </main>
  );
};

export default LoginPage;
