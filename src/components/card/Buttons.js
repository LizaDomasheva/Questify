import React, { useState } from 'react';
import styled from './card.module.css';
import DeleteQuestModal from './DeleteQuestModal';

const Buttons = ({ deleteCard, id, resetStartFlag, updateCard }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styled.btn_wrap}>
        <button onClick={showModal} className={styled.delete}></button>
        {isModalOpen && (
          <DeleteQuestModal
            deleteCard={deleteCard}
            id={id}
            closeModal={closeModal}
          />
        )}
        <div className={styled.strip}></div>
        <button onClick={updateCard} className={styled.start}>
          Start
        </button>
      </div>
    </>
  );
};
export default Buttons;
