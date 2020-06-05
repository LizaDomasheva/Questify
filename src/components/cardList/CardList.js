import React, { useState } from 'react';
import Card from '../card/Card';
import styled from '../card/card.module.css';
import CardChallenge from '../card/CardChallenge';

const initialState = {
  name: null,
  difficulty: null,
  group: null,
  isPriority: null,
  dueDate: null,
};

const CardList = ({ arr, challengeSendToUser }) => {
  const [cardState, setCardState] = useState(initialState);
  //   setState(prev => ({ ...prev, [name]: value }));
  const changeCard = ({ name, difficulty, group, isPriority, dueDate }) => {
    setCardState(prev => ({
      ...prev,
      name,
      difficulty,
      group,
      isPriority,
      dueDate,
    }));
  };
  const findId = e => {
    if (!e.target.closest('li').children) {
      return;
    }
    const li = e.target.closest('li');
    const id = li.dataset.id;
    const findCard = arr.find(item => item._id === id);

    changeCard(findCard);
  };

  return (
    <ul className={styled.card_list} onClick={findId}>
      {arr.map(card => (
        <li
          data-id={card._id}
          key={card._id}
          className={card.isEdit ? styled.card_active : styled.card_border}>
          {!card.hasOwnProperty('challengeSendToUser') && <Card arr={card} />}
          {card.hasOwnProperty('challengeSendToUser') && (
            <CardChallenge arr={card} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default CardList;
