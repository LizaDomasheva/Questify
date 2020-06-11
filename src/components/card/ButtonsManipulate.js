import React, { useState } from "react";
import styled from "./card.module.css";
import DeleteQuestModal from "./DeleteQuestModal";
import { CompletedModal } from "./CompletedModal";
import { CompletedChallenge } from "./CompletedChallenge";

const ButtonsManipulate = ({
  saveCard,
  deleteCard,
  id,
  isTaskDone,
  cardState,
  isQuest,
  userId,
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
      <button onClick={saveCard} className={styled.save}></button>
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
      {cardState.done && isQuest &&(
        <CompletedModal
          title={cardState.name}
          updateCard={saveCard}
          id={id}
          cardState={cardState}
        />
      )}
      {cardState.done && !isQuest && (
        <CompletedChallenge
        title={cardState.name}
          updateCard={saveCard}
          id={id}
          userId={userId}
          cardState={cardState}
          />
      )
    }
    </div>
  );
};

export default ButtonsManipulate;
