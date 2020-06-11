import React, { useState } from "react";
import DatePicker from "react-date-picker";
import Select from "../Select";
import styled from "../card.module.css";
import { useDispatch } from "react-redux";
import easydate from "easydate";
import SelectCategory from "../SelectCategory";
import { removeCard, changeCard } from "../../../redux/dashboardOperations";
import DeleteQuestModal from "../DeleteQuestModal";
import { CompletedModal } from "../CompletedModal";

function CardEditing({ arr }) {
  const { dueDate, name, isPriority, group, difficulty, _id, isEdit } = arr;
  const initialState = {
    name: name,
    difficulty: difficulty,
    group: group,
    isPriority: isPriority,
    dueDate: new Date(dueDate),
    isEdit: isEdit || null,
    defaultSelectColor: "card_category",
    defaultSelectGroupClr: "card_item",
  };

 

  const [cardState, setCardState] = useState(initialState);
  const changeName = ({ target: { name, value } }) => {
    setCardState((prev) => ({ ...prev, [name]: value }));
  };

  const onSelectColor = (value) => {
    setCardState((prev) => ({
      ...prev,
      defaultSelectGroupClr: value + "_select",
    }));
  };

  const onSelectChange = (value) => {
    setCardState((prev) => ({
      ...prev,
      defaultSelectColor: value + "_category",
    }));
  };

  const handleChange = (props) => {
    setCardState((prev) => ({ ...prev, dueDate: props }));
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
    dispatch(changeCard(_id, correctCardData));
  };

  const isTaskDone = () => {
    setCardState((prev) => ({ ...prev, done: !prev.done }));
  };

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
}

export default CardEditing;
