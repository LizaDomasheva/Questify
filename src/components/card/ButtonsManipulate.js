import React, { useState } from "react";
import styled from "./card.module.css";
import DeleteQuestModal from "./DeleteQuestModal";
import { CompletedModal } from "./CompletedModal";

const ButtonsManipulate = ({
  updateCard,
  deleteCard,
  id,
  isTaskDone,
  cardState,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styled.card_btn__create}>
      <button onClick={updateCard} className={styled.save}></button>
      <div className={styled.strip}></div>
      <button onClick={showModal} className={styled.delete}></button>
      {isModalOpen && (
        <DeleteQuestModal
          deleteCard={deleteCard}
          id={id}
          closeModal={closeModal}
        />
      )}
      <div className={styled.strip}></div>
      <button onClick={isTaskDone} className={styled.done}></button>
      {cardState.done && (
        <CompletedModal
          title={cardState.name}
          updateCard={updateCard}
          id={id}
          cardState={cardState}
        />
      )}
    </div>
  );
};

export default ButtonsManipulate;
