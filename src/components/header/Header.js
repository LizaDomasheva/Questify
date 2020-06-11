import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import css from './header.module.css';
import { userSlice } from '../../redux/reducers/userReducer';

const initialState = {
  nickname: '',
};

const Header = ({ nickname, history, allTheRest, todayCard, tomorrow }) => {
  const [clearUser, setClearUser] = useState(initialState);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(userSlice.actions.logOutUser({ ...clearUser }));

    setClearUser(() => ({ nickname: '' }));
    history.push('/');
  };

  let logoLetter = '';

  if (nickname !== null) {
    logoLetter = nickname.charAt(0).toUpperCase();
  }

  const findChallenge =
    (allTheRest && allTheRest.find(card => card.challengeSendToUser)) ||
    (todayCard && todayCard.find(card => card.challengeSendToUser)) ||
    (tomorrow && tomorrow.find(card => card.challengeSendToUser));

  const trophy =
    findChallenge && findChallenge.challengeSendToUser
      ? css.trophyDisabled
      : css.trophy;

  return (
    <>
      <div className={css.header}>
        <div>
          <div className={css.wrap}>
            {/* <Link to='/'> */}
            <div id="my-div" className={css.logo}></div>
            {/* </Link> */}
            <div className={css.userWrap}>
              <div className={css.user}>
                <span className={css.name}>{logoLetter}</span>
              </div>
              <p className={css.userText}>{nickname}'s Quest Log</p>
            </div>
            <div className={css.iconsWrap}>
              <button
                className={trophy}>
                  <p className={css.gotChallenge}>You've got new challenge!</p>
                </button>
               

              <button onClick={handleLogOut} className={css.exit}>
              <p className={css.logOut}>Log out</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
