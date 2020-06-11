import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import styled from './card.module.css';
import Select from './Select';
import { useDispatch } from 'react-redux';
import SelectCategory from './SelectCategory';
import easydate from 'easydate';
import { startChallenge } from '../../redux/dashboardOperations';
import Buttons from './Buttons';
import ButtonsManipulate from './ButtonsManipulate';
import { deleteChallenge } from '../../redux/dashboardOperations';
import { editChallenge } from '../../redux/dashboardOperations';

function CardChallenge({
  arr,
  resetEditFlag,
  resetStartFlag,
  startFlag,
  setEditFlagTrue,
  editFlag,
  todayCard,
  allTheRest,
}) {
  const {
    dueDate,
    name,
    group,
    difficulty,
    _id,
    challengeSendToUser,
    isEdit,
    isQuest,
    userId,
    done,
  } = arr;

  const initialState = {
    name: name,
    difficulty: difficulty,
    group: group,
    dueDate: new Date(dueDate),
    challengeSendToUser: false,
    isEdit: isEdit,
    isQuest: isQuest,
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
    setCardState(prev => ({
      ...prev,
      group: value,
    }));
  };
  const dispatch = useDispatch();

  const handleChange = props => {
    setCardState(prev => ({ ...prev, dueDate: props }));
  };
  const showModal = () => {
    setCardState(true);
  };

  const deleteCard = () => {
    dispatch(deleteChallenge(_id, userId));
    resetStartFlag();
  };

  const updateCard = async e => {
    e.stopPropagation();
    // const correctCardData = {
    //   ...cardState,
    //   dueDate: easydate('Y-M-dTh:m:s.000Z', { setDate: cardState.dueDate }),
    // };
    dispatch(startChallenge(_id));
    setCardState(prev => ({ ...prev, isEdit: false }));
    resetStartFlag();
  };

  const saveCard = async  => {
    const correctCardData = easydate('Y-M-dTh:m:s.000Z', {
      setDate: cardState.dueDate,
    });
    dispatch(editChallenge(_id, correctCardData, cardState.difficulty));
    resetStartFlag();
  };

  const isTaskDone = () => {
    setCardState(prev => ({ ...prev, done: !prev.done }));
  };

  const changeIsEdit = e => {
    if (editFlag) return;
    setCardState(prev => ({ ...prev, isEdit: true }));
  };

  return (
    <>
      <div onClick={changeIsEdit} className={styled.card_background}>
        <div className={styled.card_header}>
          <div className={styled.card_item}>
            <Select
              defaultSelectGroupClr={selectState.defaultSelectGroupClr}
              onSelectColor={event => onSelectColor(event.target.value)}
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
          {(new Date(dueDate).getDate() === new Date(Date.now()).getDate()) &&
            !cardState.isEdit &&
            !done &&
            !allTheRest  
            && <div className={styled.fireChallenge} />}
        </div>
        <div className={styled.card_block}>
          <div className={styled.card_category}>
            <SelectCategory
              defaultSelectColor={selectState.defaultSelectColor}
              onSelectChange={event => onSelectChange(event.target.value)}
              group={cardState.group}
            />
          </div>
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
