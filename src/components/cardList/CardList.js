import React, { useState } from 'react';
import Card from '../card/Card';
import styled from '../card/card.module.css';
import CardChallenge from '../card/CardChallenge';
import CardEditing from '../card/cardEditing/CardEditing';

const CardList = ({
  arr,
  editFlag,
  resetEditFlag,
  setEditFlagTrue,
  startFlag,
  resetStartFlag,
}) => {
  

  const findId = e => {
    if (!e.target.closest('li')) {
      return;
    }
    const li = e.target.closest('li');
    const id = li.dataset.id;
    const findCard = arr.find(item => item._id === id);
  
  };

  const editStateTest = e => {
    findId(e);

  };

  return (
    <ul className={styled.card_list}>
      {/* <ul className={styled.card_list} onClick={findId}> */}
      {arr.length &&
        arr.map(card => {
          return (
            <li
              data-id={card._id}
              key={card._id}
              // className={card.isEdit ? styled.card_active : styled.card_border}
              // className={styled.card_border}
            >
              {/* <CardEditing arr={card}/> */}
              {/* {update && <CardEditing arr={card}/>} */}
              {/* {!card.hasOwnProperty('challengeSendToUser') && <CardEditing arr={card} />} */}
              {!card.hasOwnProperty('challengeSendToUser') && (
                <Card
                  arr={card}
                  editStateTest={editStateTest}
                  isEdit={card.isEdit}
                  editFlag={editFlag}
                  resetEditFlag={resetEditFlag}
                  setEditFlagTrue={setEditFlagTrue}
                  startFlag={startFlag}
                  resetStartFlag={resetStartFlag}
                />
              )}

              {card.hasOwnProperty("challengeSendToUser") && (
                <CardChallenge arr={card} resetEditFlag={resetEditFlag} resetStartFlag={resetStartFlag} startFlag={startFlag} setEditFlagTrue={setEditFlagTrue} editFlag={editFlag} />

              )}
            </li>
          );
        })}
    </ul>
  );
};

export default CardList;
