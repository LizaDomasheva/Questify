import React, { useState } from 'react';
import chroma from 'chroma-js';
import { css } from 'emotion';
import DatePicker from 'react-date-picker';
import Select from 'react-select';
import styled from './card.module.css';
import { useDispatch } from 'react-redux';
import SelectCategory from './SelectCategory';
import { removeCard } from '../../redux/dashboardOperations';
import DeleteQuestModal from './DeleteQuestModal';

// const [cardName, setCardState] = useState({name: null})
function Card({ arr }) {
  const { dueDate, name, isPriority, group, difficulty, _id, isEdit } = arr;
  const initialState = {
    name: name,
    difficulty: difficulty,
    group: group,
    isPriority: isPriority,
    dueDate: new Date(dueDate),
    isEdit: isEdit || null,
    defaultSelectColor: 'card_category'
  };

  const [cardState, setCardState] = useState(initialState);
  const changeName = ({ target: { name, value } }) => {
    setCardState(prev => ({ ...prev, [name]: value }));
  };

//  const changeName = ({ target: { name, value } }) => {
//   setCardState((prev) => ({ ...prev, [name]: value }));
// };
const onSelectChange = (value) => {
  console.log(cardState)
  setCardState((prev) => ({ ...prev, defaultSelectColor: value + '_category' }));
}
  const handleChange = props => {
    setCardState(prev => ({ ...prev, dueDate: props }));
  };
  let star = isPriority ? styled.star_icon : styled.nostar_icon;

  const changeColor = isPriority => {
    return (star = isPriority ? styled.star_icon : styled.nostar_icon);
  };

  const handleIsPriority = e => {
    console.log(e.target);
    console.log(typeof isPriority);
    setCardState(prev => ({ ...prev, isPriority: !prev.isPriority }));
    console.log(isPriority);
    changeColor(cardState.isPriority);
    console.log(cardState.isPriority);
    const op = changeColor();
    // star = isPriority ? styled.star_icon : styled.nostar_icon;
  };

  const dispatch = useDispatch();
  const deleteCard = _id => {
    dispatch(removeCard(_id));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = e => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styled.card_header}>
        <Select />
        {/* {isPriority ? (
          <div className={styled.star_icon} onClick={handleIsPriority}></div>
        ) : (
          <div className={styled.nostar_icon} onClick={handleIsPriority}></div>
        )} */}
        <div className={star} onClick={handleIsPriority}></div>
      </div>

      <div className={styled.card_wrapper}>
        <div className={styled.card_container}>
          <input
            className={styled.card_input}
            type="text"
            placeholder="Enter quest name"
            name="name"
            value={cardState.name}
            autoFocus
            required
            onChange={changeName}
          />
          <div className={styled.date}>
            <DatePicker
              className={styled.date_picker}
              selected={cardState.dueDate}
              value={cardState.dueDate}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styled.card_block}>
          <div className={styled.card_category}>
            <SelectCategory
              defaultSelectColor={cardState.defaultSelectColor}
              onSelectChange={event => onSelectChange(event.target.value)}
              group={group}/>
          </div>
          <div className={styled.card_btn__create}>
            {/* <button className={styled.delete}></button> 
                        <div className={styled.strip}></div>              
                        <button className={styled.start}>Start</button> */}

            <button className={styled.save}></button>
            <div className={styled.strip}></div>
            <button
              // onClick={() => deleteCard(_id)}
              onClick={() => showModal()}
              className={styled.delete}></button>
            {isModalOpen && (
              <DeleteQuestModal
                deleteCard={deleteCard}
                id={_id}
                closeModal={closeModal}
              />
            )}
            <div className={styled.strip}></div>
            <button className={styled.done}></button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
