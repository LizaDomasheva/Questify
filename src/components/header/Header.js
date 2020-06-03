import React from "react";
import { Link } from "react-router-dom";
import css from "./header.module.css";

const Header = () => {
  const handleLogOut = () => {};

  const showChallengeCard = () => {};

  return (
    <>
      <div className={css.header}>
        <div className={css.container}>
          <div className={css.wrap}>
            {/* <Link to='/'> */}
            <div className={css.logo}></div>
            {/* </Link> */}
            <div className={css.userWrap}>
              <div className={css.user}>
                <span className={css.name}>I</span>
              </div>
              <p className={css.userText}>User's Quest Log</p>
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
