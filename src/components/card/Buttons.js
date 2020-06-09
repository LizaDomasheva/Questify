import React, { useState } from "react";
import styled from "./card.module.css";
import DeleteQuestModal from "./DeleteQuestModal";
import ButtonsManipulate from "./ButtonsManipulate";

const Buttons = ({ deleteCard, id, resetStartFlag, updateCard }) => {
  const [isStart, setIsStart] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const startEdit = () => {
    setIsStart(true);
  };

  return (
    <>
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
    </>
  );
};
export default Buttons;
