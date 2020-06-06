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

function Card({ arr }) {
  const { dueDate, name, isPriority, group, difficulty, _id, isEdit } = arr;
  const initialState = {
    name: name,
    difficulty: difficulty,
    group: group,
    isPriority: isPriority,
    dueDate: new Date(dueDate),
    isEdit: isEdit || null,
  };

  const [cardState, setCardState] = useState(initialState);
  const changeName = ({ target: { name, value } }) => {
    setCardState(prev => ({ ...prev, [name]: value }));
  };

  const handleChange = props => {
    setCardState(prev => ({ ...prev, dueDate: props }));
  };

  const handleIsPriority = e => {
    setCardState(prev => ({ ...prev, isPriority: !prev.isPriority }));
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
        <div className={cardState.isPriority ? styled.star_icon :styled.nostar_icon} onClick={handleIsPriority}></div>
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
            <SelectCategory group={group} />
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
