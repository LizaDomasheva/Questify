import React from 'react';
import Card from '../card/Card';
import styled from '../card/card.module.css';

const CardList = ({ todayCard }) => {
  return (
    <div className={styled.dashboard}>
      <h3 className={styled.title}>TODAY</h3>
      <ul className={styled.card_list}>
        {todayCard.map(card => (
          <li
            data-id={card._id}
            key={card._id}
            className={card.isEdit ? styled.card_active : styled.card_border}
          >
            <Card todayCard={card} />
          </li>
        ))}
      </ul>
      <h3 className={styled.title}>TOMORROW</h3>
      <div className={styled.doneFigure}>
        <div className={styled.doneLine}></div>
        <h3 className={styled.title}>DONE</h3>
      </div>
      <h3 className={styled.title}>ALL THE REST</h3>
    </div>
  );
};

export default CardList;
