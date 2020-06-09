import React, { useState } from "react";
// import chroma from "chroma-js";
// import { css } from "emotion";
import DatePicker from "react-date-picker";
import Select from "../Select";
import styled from "../card.module.css";
import { useDispatch } from "react-redux";
import easydate from "easydate";
import SelectCategory from "../SelectCategory";
import { removeCard, changeCard } from "../../../redux/dashboardOperations";
import DeleteQuestModal from "../DeleteQuestModal";
// import axios from "axios";
// import moment from "moment";
import { CompletedModal } from "../CompletedModal";
import Buttons from "../Buttons";

function CardEditing({ arr }) {
  const { dueDate, name, isPriority, group, difficulty, _id, isEdit } = arr;
  const initialState = {
    name: name,
    difficulty: difficulty,
    group: group,
    isPriority: isPriority,
    // dueDate: easydate("Y-M-dTh:m:s.000Z", { setDate: dueDate }),
    dueDate: new Date(dueDate),
    isEdit: isEdit || null,
    defaultSelectColor: "card_category",
    defaultSelectGroupClr: "card_item",
  };

  // const selectInitialState = {
  //   defaultSelectColor: 'card_category',
  //   defaultSelectGroupClr: 'card_item',
  // };

  const [cardState, setCardState] = useState(initialState);
  // const [selectState, setSelectState] = useState(selectInitialState);
  const changeName = ({ target: { name, value } }) => {
    setCardState((prev) => ({ ...prev, [name]: value }));
  };

  const onSelectColor = (value) => {
    // console.log('valueColor :>> ', value);
    // setSelectState(() => ({ defaultSelectGroupClr: value + '_select' }));
    setCardState((prev) => ({
      ...prev,
      defaultSelectGroupClr: value + "_select",
    }));
  };

  const onSelectChange = (value) => {
    // console.log('value :>> ', value);
    // setSelectState(() => ({ defaultSelectColor: value + '_category' }));
    setCardState((prev) => ({
      ...prev,
      defaultSelectColor: value + "_category",
    }));
  };

  // const onSelectColor = value => {
  //   console.log('valueColor :>> ', value);
  //   setSelectState(() => ({ defaultSelectGroupClr: value + '_select' }));
  //   setSelectState(prev => ({
  //     ...prev,
  //     // defaultSelectGroupClr: value + '_select',
  //     group: value,
  //   }));
  // };

  // const onSelectChange = value => {
  //   console.log('value :>> ', value);
  //   setSelectState(() => ({ defaultSelectColor: value + '_category' }));
  //   setSelectState(prev => ({
  //     ...prev,
  //     // defaultSelectColor: value + '_category',
  //     group: value,
  //   }));
  // };

  // const onSelectChange = e => {
  //   console.log('e.target.value', e.target.value);
  //   setCardState(prev => ({ ...prev, group: e.target.value }));
  // };

  const handleChange = (props) => {
    setCardState((prev) => ({ ...prev, dueDate: props }));
    // console.log("dueDate", dueDate);
    // console.log(
    //   "dueDateEasy",
    //   easydate("Y-M-dTh:m:s.000Z", { setDate: cardState.dueDate })
    // );
    // console.log("props", props);
  };

  const star = cardState.isPriority ? styled.star_icon : styled.nostar_icon; ///перепроверить
  const handleIsPriority = (e) => {
    setCardState((prev) => ({ ...prev, isPriority: !prev.isPriority }));
  };

  const dispatch = useDispatch();
  const deleteCard = (_id) => {
    dispatch(removeCard(_id));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updateCard = () => {
    const correctCardData = {
      ...cardState,
      dueDate: easydate("Y-M-dTh:m:s.000Z", { setDate: cardState.dueDate }),
      isEdit: false,
    };
    // console.log("prepairData", correctCardData);

    dispatch(changeCard(_id, correctCardData));
  };

  // const onSelectChange = (e) => {
  //   // console.log("e.target.value", e.target.value);
  //   setCardState((prev) => ({ ...prev, group: e.target.value }));
  // };

  const isTaskDone = () => {
    setCardState((prev) => ({ ...prev, done: !prev.done }));
    // console.log("cardState", cardState);
  };

  // console.log("cardState", cardState);
  return (
    <>
      <div className={styled.card_header}>
        <div className={styled.card_item}>
          <Select
            defaultSelectGroupClr={cardState.defaultSelectGroupClr}
            onSelectColor={(event) => onSelectColor(event.target.value)}
            difficulty={difficulty}
          />
        </div>
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
            className={styled.card_input_disActive}
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
              dateFormat="YYYY-MM-DD"
            />
          </div>
        </div>
        <div className={styled.card_block}>
          <div className={styled.card_category}>
            <SelectCategory
              onSelectChange={onSelectChange}
              defaultSelectColor={cardState.defaultSelectColor}
              onSelectChange={(event) => onSelectChange(event.target.value)}
              group={cardState.group}
            />
          </div>
            {/* <Buttons deleteCard={deleteCard} showModal={showModal} id={_id}/> */}
          <div className={styled.card_btn__create}>

            <button onClick={updateCard} className={styled.save}></button>
            <div className={styled.strip}></div>
            <button
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
            <button onClick={isTaskDone} className={styled.done}></button>
            {cardState.done && (
              <CompletedModal
              title={cardState.name}
              updateCard={updateCard}
              _id={_id}
              cardState={cardState}
              />
              )}
          </div>
        </div>
      </div>
    </>
  );
  {
    /* <button className={styled.delete}></button> 
  <div className={styled.strip}></div>              
<button className={styled.start}>Start</button> */
  }
  // onSelectChange={onSelectChange}
}

export default CardEditing;
