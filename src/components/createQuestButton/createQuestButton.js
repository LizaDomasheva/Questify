import React from 'react';
import clsx from 'clsx';
import styles from './CreateQuestButton.module.css';

function CreateQuestButton({ handleClick, isOpen }) {
    return (
      <button className={styles.createButton}
        // className={clsx(
        //   styles.createButton,
        //   !isOpen ? styles.active__button : styles.passive__button,
        // )}
        // onClick={handleClick}
      >
        +
      </button>
    );
  }
  
  export default CreateQuestButton;