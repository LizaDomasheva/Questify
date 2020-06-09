import React, { useState } from 'react';
import { css } from 'emotion';
import DatePicker from 'react-date-picker';
import styled from './card.module.css';
import Select from './Select';
import { useDispatch } from 'react-redux';
import SelectCategory from './SelectCategory';
import easydate from 'easydate';
import DeleteQuestModal from './DeleteQuestModal';
import CompletedChallenge from './CompletedChallenge';
import { removeCard } from '../../redux/dashboardOperations';

function CardChallenge({ arr }) {
  console.log('arr', arr);
  const { dueDate, name, group, difficulty, _id, challengeSendToUser } = arr;
  const initialState = {
    name: name,
    difficulty: difficulty,
    group: group,
    dueDate: new Date(dueDate),
    challengeSendToUser: false,
    defaultSelectColor: 'card_category',
    defaultSelectGroupClr: 'card_item',
  };

  const [cardState, setCardState] = useState(initialState);

  const onSelectColor = value => {
    setCardState(prev => ({
      ...prev,
      defaultSelectGroupClr: value + '_select',
    }));
  };

  const onSelectChange = value => {
    console.log('value :>> ', value);
    setCardState(prev => ({
      ...prev,
      defaultSelectColor: value + '_category',
    }));
  };

  const dispatch = useDispatch();
  const deleteCard = _id => {
    dispatch(removeCard(_id));
  };

  const handleChallengeTrophy = () => {
    setCardState(prev => ({
      ...prev,
      challengeSendToUser: true,
    }));
  };

  const handleChange = props => {
    setCardState(prev => ({ ...prev, dueDate: props }));
    console.log('dueDate', dueDate);
    console.log(
      'dueDateEasy',
      easydate('Y-M-dTh:m:s.000Z', { setDate: cardState.dueDate }),
    );
    // console.log("props", props);
  };

  const showModal = () => {
    setCardState(true);
  };

  const closeModal = () => {
    setCardState(false);
  };
  // const tempCard = arr;
  // const { dueDate, name, group } = tempCard;
  // console.log('difficulty', difficulty)
  // let [value, setValue] = useState(new Date(dueDate));
  // let [selectOption, setSelectOption] = useState(difficulty.toLowerCase())
  // console.log('selectOption', selectOption)

  return (
    <>
      {/* <div className={styled.card_list}> */}
      {/* {!challengeSendToUser &&  */}
      <div className={styled.card_background}>
        <div className={styled.card_header}>
          <div className={styled.card_item}>
            <Select
              defaultSelectGroupClr={cardState.defaultSelectGroupClr}
              onSelectColor={event => onSelectColor(event.target.value)}
              difficulty={difficulty}
            />
          </div>

          <div className={styled.trophy_icon}></div>
        </div>

        <div className={styled.card_container}>
          <p className={styled.card_challenge}>Challenge</p>
          <h2 className={styled.card_title}>{name}</h2>
        </div>

        <div className={styled.date}>
          <DatePicker
            className={styled.date_picker}
            selected={cardState.dueDate}
            value={cardState.dueDate}
            onChange={handleChange}
            dateFormat="YYYY-MM-DD"
          />
        </div>
        {/* <div className={styled.date_challenge}>
                <input className={styled.card_input__date} type="text" value="02.06.2020 10:13 PM"/>
                <button className={styled.card_btn__icon}></button>
                {/* <div>Calendar</div> */}
        {/* </div>             */}
        {/* </div> */}
        <div className={styled.card_block}>
          <div className={styled.card_category}>
            <SelectCategory
              onSelectChange={onSelectChange}
              defaultSelectColor={cardState.defaultSelectColor}
              onSelectChange={event => onSelectChange(event.target.value)}
              // onSelectChange={onSelectChange}
              group={cardState.group}
            />
          </div>
          <div className={styled.card_btn__create}>

           

          <button onClick={() => showModal()}
              className={styled.delete}
            ></button>
            {cardState && (
              <DeleteQuestModal
                deleteCard={deleteCard}
                id={_id}
                closeModal={closeModal}
              />
            )}

            <div className={styled.strip}></div>
            <button className={styled.start} onClick={handleChallengeTrophy}>
              Start
            </button>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default CardChallenge;
