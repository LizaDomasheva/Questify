import React from 'react';
import styles from './CreateQuestButton.module.css';

const CreateQuestButton = ({ onClick = () => null }) => (
  <button className={styles.Button} type="button" onClick={onClick}>
    +
  </button>
);

export default CreateQuestButton;


