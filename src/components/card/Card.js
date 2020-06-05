import React, { useState } from "react";
import chroma from "chroma-js";
import { css } from "emotion";
import DatePicker from "react-date-picker";
import Select from "react-select";
import styled from "./card.module.css";
import { useDispatch } from "react-redux";
import SelectCategory from "./SelectCategory";
import { removeCard } from "../../redux/dashboardOperations";
import DeleteQuestModal from './DeleteQuestModal'


const initialState = {
  name: null,
  difficulty: null,
  group: null,
  isPriority: null,
  dueDate: null,
}

function Card({ arr }) {
  // const optionHandleChange = (props) => {
  //   setSelectOption(props);
  // };


 const [cardState, setCardState] = useState(initialState);

 const changeName = ({ target: { name, value } }) => {
  setCardState((prev) => ({ ...prev, [name]: value }));
};

 

  const handleChange = (props) => {
    setValue(props);
  };
  const tempCard = arr;
  // console.log("tempCard :>> ", tempCard.name);
  const { dueDate, name, isPriority, group, difficulty, _id } = tempCard;
  // console.log("id", _id);
  // console.log('difficulty', difficulty)
  let [value, setValue] = useState(new Date(dueDate));
  // let [selectOption, setSelectOption] = useState(difficulty.toLowerCase());
  // console.log('selectOption', selectOption)

  const dispatch = useDispatch();

  const deleteCard = (_id) => {
    dispatch(removeCard(_id));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (e) => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styled.card_header}>
        <Select />

        {isPriority && <div className={styled.star_icon}></div>}
      </div>
      <div className={styled.card_wrapper}>
        <div className={styled.card_container}>
          <input
            className={styled.card_input}
            type="text"
            placeholder="Enter quest name"
            name="name"
            value={name}
            autoFocus
            required
            onChange={changeName}
          />
          <div className={styled.date}>
            <DatePicker
              className={styled.date_picker}
              selected={value}
              value={value}
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
              className={styled.delete}
            ></button>
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
