import React, {useState} from "react";
import styled from './card.module.css'
import DeleteQuestModal from "./DeleteQuestModal";

const ButtonsManipulate = ({updateCard, deleteCard, id}) => {

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

    {/* <button onClick={updateCard} className={styled.save}></button> */}
    <div className={styled.strip}></div>
    <button onClick={showModal} className={styled.delete}></button>
    {isModalOpen && <DeleteQuestModal deleteCard={deleteCard} id={id} closeModal={closeModal}/>}

    {/* <button onClick={() => showModal()} className={styled.delete}></button> */}
    {/* {isModalOpen && (
      <DeleteQuestModal
        deleteCard={deleteCard}
        id={_id}
        closeModal={closeModal}
      />
    )} */}
    <div className={styled.strip}></div>
    <button  className={styled.done}></button>

    {/* <button onClick={isTaskDone} className={styled.done}></button> */}
    {/* {cardState.done && (
      <CompletedModal
        title={cardState.name}
        updateCard={updateCard}
        _id={_id}
        cardState={cardState}
      />
    )} */}
  </div>
  )
};

export default ButtonsManipulate;
