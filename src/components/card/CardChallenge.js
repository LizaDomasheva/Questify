import React, { useState } from "react";
import { css } from "emotion";
import DatePicker from "react-date-picker";
import styled from "./card.module.css";
import Select from "./Select";
import { useDispatch } from "react-redux";
import SelectCategory from "./SelectCategory";
import easydate from "easydate";
import DeleteQuestModal from "./DeleteQuestModal";
import CompletedChallenge from "./CompletedChallenge";
import { removeCard, changeCard } from "../../redux/dashboardOperations";
import axios from "axios";
import { startChallenge } from "../../redux/dashboardOperations";
import Buttons from "./Buttons";
import ButtonsManipulate from "./ButtonsManipulate";
import { deleteChallenge } from "../../redux/dashboardOperations";
import { editChallenge } from "../../redux/dashboardOperations";


function CardChallenge({ arr, resetEditFlag, resetStartFlag, startFlag, setEditFlagTrue, editFlag, todayCard, allTheRest }) {
  const { dueDate, name, group, difficulty, _id, challengeSendToUser, isEdit, isQuest, userId, done } = arr;

  const initialState = {
    name: name,
    difficulty: difficulty,
    group: group,
    dueDate: new Date(dueDate),
    challengeSendToUser: false,
    isEdit: isEdit,
    isQuest: isQuest

  };
  const selectInitialState = {
    defaultSelectColor: 'card_category',
    defaultSelectGroupClr: 'card_item',
  };
  const [cardState, setCardState] = useState(initialState);
  const [selectState, setSelectState] = useState(selectInitialState);
  const onSelectColor = value => {
    setSelectState(prev => ({
      ...prev,
      defaultSelectGroupClr: value + '_select',
    }));
    setCardState(prev => ({
      ...prev,
      difficulty: value,
    }));
  };

  const onSelectChange = value => {
    setSelectState(prev => ({
      defaultSelectColor: value + '_category',
    }));
    console.log('selectState', selectState);
    setCardState(prev => ({
      ...prev,
      group: value,
    }));
  };
  const dispatch = useDispatch();

  const handleChange = (props) => {
    setCardState((prev) => ({ ...prev, dueDate: props }));
  };
  const showModal = () => {
    setCardState(true);
  };
  const closeModal = () => {
    setCardState(false);
  };


  const deleteCard = () => {
    dispatch(deleteChallenge(_id, userId));
    // resetEditFlag();
    resetStartFlag();

  };

  const updateCard = async (e) => {
    e.stopPropagation()
      const correctCardData = {
        ...cardState,
        dueDate: easydate('Y-M-dTh:m:s.000Z', { setDate: cardState.dueDate }),
      };
      dispatch(startChallenge(_id));
      setCardState((prev) => ({ ...prev, isEdit: false }));
      // resetEditFlag();
      resetStartFlag();
  };

  const saveCard = async (e) => {
    // e.stopPropagation()
    const correctCardData = easydate('Y-M-dTh:m:s.000Z', { setDate: cardState.dueDate });
      dispatch(editChallenge(_id, correctCardData, cardState.difficulty));

    // dispatch(editChallenge(_id, cardState.dueDate, cardState.difficulty));
    // setCardState((prev) => ({ ...prev, isEdit: false }));
    resetStartFlag();
    // resetEditFlag();
    // console.log('тиск дискетку')
  }; 

  const isTaskDone = (e) => {
  
    console.log('e.targetTaskDone :>> ', e.target);
    setCardState((prev) => ({ ...prev, done: !prev.done }));
 
  };

  const changeIsEdit = (e) => {
console.log('e.targetDIVchall :>> ', e.target);
    if (editFlag) return;
    // if (done) {
    //   console.log('cardState.done = ', done)
    //   return};
    setCardState((prev) => ({ ...prev, isEdit: true }));
    // setEditFlagTrue();
  };

  return (
    <>
      <div onClick={changeIsEdit} className={styled.card_background}>
        <div className={styled.card_header}>
          <div className={styled.card_item}>
            <Select
              defaultSelectGroupClr={selectState.defaultSelectGroupClr}
              onSelectColor={(event) => onSelectColor(event.target.value)}
              difficulty={cardState.difficulty}
              isQuest={cardState.isQuest}
              isEdit={cardState.isEdit}
            />
          </div>
          <div className={styled.trophy_icon}></div>
        </div>
        <div className={styled.card_container_challenge}>
          <p className={styled.card_challenge}>Challenge</p>
          <h2 className={styled.card_title}>{name}</h2>
        </div>

        <div className={styled.dateChallenge}>
          <DatePicker
            className={styled.date_pickerChallenge}
            selected={cardState.dueDate}
            value={cardState.dueDate}
            onChange={handleChange}
            dateFormat="YYYY-MM-DD"
            clearIcon={!cardState.isEdit && null}
            disabled={!cardState.isEdit}

            locale="ua-GB"

          />
                        {new Date(dueDate).getDate() === new Date(Date.now()).getDate() &&
                !cardState.isEdit && !done && !allTheRest && todayCard && <div className={styled.fireChallenge} />}
        </div>
        <div className={styled.card_block}>
          <div className={styled.card_category}>
            <SelectCategory
              defaultSelectColor={selectState.defaultSelectColor}
              onSelectChange={(event) => onSelectChange(event.target.value)}
              group={cardState.group}
            />
          </div>
          {/* {!challengeSendToUser && !done && (         */}
          {!challengeSendToUser && (
            <Buttons
              updateCard={updateCard}
              deleteCard={deleteCard}
              id={_id}
              resetStartFlag={resetStartFlag}
            />
          )}
          {challengeSendToUser && cardState.isEdit && (
            <ButtonsManipulate
              cardState={cardState}
              deleteCard={deleteCard}
              showModal={showModal}
              id={_id}
              userId={userId}
              // updateCard={updateCard}
              saveCard={saveCard}
              isTaskDone={isTaskDone}
            />
          )}
        </div>
      </div>
    </>
  );
}
export default CardChallenge;


