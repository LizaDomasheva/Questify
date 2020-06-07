import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import css from './header.module.css';
import {userSlice} from '../../redux/reducers/userReducer';


const initialState = {
  nickname: '',
};

const Header = ({ nickname, history }) => {
  const [clearUser, setClearUser] = useState(initialState)
  const dispatch = useDispatch()
  const handleLogOut = () => {
    dispatch(userSlice.actions.logOutUser({...clearUser}))
    setClearUser(() => ({nickname: ''}))
    history.push('/');
  };
  const showChallengeCard = () => {};
  let logoLetter = ''
  if(nickname !== null) {
    console.log('logoLetter :>> ', logoLetter);
    console.log('nickName :>> ', nickname);
    logoLetter = nickname.charAt(0).toUpperCase()
  }

  return (
    <>
      <div className={css.header}>
        <div >
          <div className={css.wrap}>
            {/* <Link to='/'> */}
            <div className={css.logo}></div>
            {/* </Link> */}
            <div className={css.userWrap}>
              <div className={css.user}>
                <span className={css.name}>{logoLetter}</span>
              </div>
              <p className={css.userText}>{nickname}'s Quest Log</p>
            </div>
            <div className={css.iconsWrap}>
              <button
                onClick={showChallengeCard}
                className={css.trophy}
              ></button>
              <button onClick={handleLogOut} className={css.exit}></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
