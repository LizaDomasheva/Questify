import React, { useState } from 'react';
import Card from '../card/Card';
import styled from '../card/card.module.css';
import CardChallenge from '../card/CardChallenge';

// const CardList = ({arr, challengeSendToUser}) => {
//   console.log('arr :>> ', arr);
//     return (
//         <ul className={styled.card_list}>
//             {arr.map(card=>(<li data-id={card._id} key={card._id} className={card.isEdit ? styled.card_active : styled.card_border}>
//                 { !card.hasOwnProperty('challengeSendToUser')  &&
//                 <Card arr={card}/>}
//                 { card.hasOwnProperty('challengeSendToUser')  &&
//                 <CardChallenge arr={card}/>}
//                 </li>))}
//         </ul>
// )};

// export default CardList;


// const CardList = ({ todayCard }) => {
//   return (
//     <div className={styled.dashboard}>
//       <h3 className={styled.title}>TODAY</h3>
//       <ul className={styled.card_list}>
//         {todayCard.map(card => (
//           <li
//             data-id={card._id}
//             key={card._id}
//             className={card.isEdit ? styled.card_active : styled.card_border}
//           >
//             <Card todayCard={card} />
//           </li>
//         ))}
//       </ul>
//       <h3 className={styled.title}>TOMORROW</h3>
//       <div className={styled.doneFigure}>
//         <div className={styled.doneLine}></div>
//         <h3 className={styled.title}>DONE</h3>
//       </div>
//       <h3 className={styled.title}>ALL THE REST</h3>
//     </div>
//   );
// };
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
    if (!e.target.closest('li')) {
      return;
    }
    const li = e.target.closest('li');
    const id = li.dataset.id;
    const findCard = arr.find(item => item._id === id);

    changeCard(findCard);
  };

  return (
    <ul onClick={findId}>
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
