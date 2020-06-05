import React from 'react';
import clsx from 'clsx';
import styles from './CreateQuestButton.module.css';

const CreateQuestButton = ({ onClick = () => null }) => (
  <button className={styles.Button} type="button" onClick={onClick}>
    +
  </button>
);

export default CreateQuestButton;

// function CreateQuestButton({ handleClick, isOpen }) {
//   console.log('handleClick :>> ', handleClick);
//     return (
//       <button
//       // className={styles.createButton}
//         className={clsx(
//           styles.createButton,
//           !isOpen ? styles.active__button : styles.passive__button,
//         )}
//         onClick={handleClick}
//       >
//         +
//       </button>
//     );
//   }

//   export default CreateQuestButton;
