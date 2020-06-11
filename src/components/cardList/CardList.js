import React from 'react';
import Card from '../card/Card';
import styled from '../card/card.module.css';
import CardChallenge from '../card/CardChallenge';

const CardList = ({
  arr,
  editFlag,
  resetEditFlag,
  setEditFlagTrue,
  startFlag,
  resetStartFlag,
  todayCard,
  allTheRest,
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
    
      {arr &&
        arr.map(card => {
          return (
            <li
              data-id={card._id}
              key={card._id}
            >
             
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

              {card.hasOwnProperty('challengeSendToUser') && (
                <CardChallenge
                  arr={card}
                  resetEditFlag={resetEditFlag}
                  resetStartFlag={resetStartFlag}
                  startFlag={startFlag}
                  setEditFlagTrue={setEditFlagTrue}
                  editFlag={editFlag}
                  todayCard={todayCard}
                  allTheRest={allTheRest}
                />
              )}
            </li>
          );
        })}
    </ul>
  );
};

export default CardList;
