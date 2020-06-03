import React, { Component } from 'react';
import Login from '../components/login/Login';
// import styles from './LoginPage.module.css';

class LoginPage extends Component {
  state = {
    nickName: '',
  };

  render() {
    return (
      <main>
        <Login />
      </main>
    );
  }
}

export default LoginPage;
