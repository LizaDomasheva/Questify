import React from 'react';
import Login from '../components/login/Login';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
  const history = useHistory();

  return (
    <main>
      <Login history={history} />
    </main>
  );
};

export default LoginPage;
