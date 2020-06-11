import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import Select from './Select';
import styled from './card.module.css';
import css from './select.module.css';
import { useDispatch } from 'react-redux';
import easydate from 'easydate';
import SelectCategory from './SelectCategory';
import { removeCard, changeCard } from '../../redux/dashboardOperations';
import DeleteQuestModal from './DeleteQuestModal';
import { CompletedModal } from './CompletedModal';
import Buttons from './Buttons';
import ButtonsManipulate from './ButtonsManipulate';

function Card({
  arr,
  editStateTest,
  update,
  editFlag,
  resetEditFlag,
  setEditFlagTrue,
  startFlag,
  resetStartFlag,
}) {

  const { dueDate, name, isPriority, group, difficulty, _id, isEdit, isQuest, done } = arr;


  const initialState = {
    name: name.length > 15 ? name.slice(0, 15) + '...' : name,
    difficulty: difficulty,
    group: group,
    isPriority: isPriority,
    dueDate: new Date(dueDate),
    isEdit: isEdit,
  };

  const selectInitialState = {
    
    defaultSelectColor: 'card_category',

    defaultSelectGroupClr: 'card_item',
  };

  

  const [cardState, setCardState] = useState(initialState);
  const [selectState, setSelectState] = useState(selectInitialState);
  const changeName = ({ target: { name, value } }) => {
    if (!cardState.isEdit) return;
    setCardState(prev => ({ ...prev, [name]: value }));
  };

  

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

  

  const handleChange = props => {
    console.log('props :>> ', props);
    if (!cardState.isEdit) return;
    setCardState(prev => ({ ...prev, dueDate: props }));
    
  };


  const star = cardState.isPriority ? styled.star_icon : styled.nostar_icon; ///перепроверить
  const handleIsPriority = e => {
    if (!cardState.isEdit) return;
    setCardState(prev => ({ ...prev, isPriority: !prev.isPriority }));
  };

  const dispatch = useDispatch();

  const deleteCard = _id => {
    dispatch(removeCard(_id));
    resetEditFlag();
    resetStartFlag();
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  

  const updateCard = (e) => {
    console.log('e :>> ', e.target);
    const correctCardData = {
      ...cardState,
      dueDate: easydate('Y-M-dTh:m:s.000Z', { setDate: cardState.dueDate }),
    };

    dispatch(changeCard(_id, correctCardData));
    resetEditFlag();
  };

  const saveCard = () => {
    const correctCardData = {
      ...cardState,
      dueDate: easydate('Y-M-dTh:m:s.000Z', { setDate: cardState.dueDate }),
    };

    dispatch(changeCard(_id, correctCardData));
    resetEditFlag();
  };

 

  const isTaskDone = () => {
    setCardState(prev => ({ ...prev, done: !prev.done }));
  };

  const editState = () => {
    setCardState(prev => ({ ...prev, isEdit: true }));
   
  };

  const changeIsEdit = e => {
    if (editFlag) return;
    // if (done) {
    //   console.log('cardState.done = ', done)
    //   return};
    editStateTest(e);
    setCardState(prev => ({ ...prev, isEdit: true }));
    
    setEditFlagTrue();
  };
  // const inFocus = cardState.isEdit && true;
  return (
    <>
      <div
        className={cardState.isEdit ? styled.card_active : styled.card_border}
        onClick={changeIsEdit}>
        <div className={styled.card_header}>
          <div className={styled.card_item}>
            <Select
              defaultSelectGroupClr={selectState.defaultSelectGroupClr}
              onSelectColor={event => onSelectColor(event.target.value)}
              difficulty={cardState.difficulty}
              isEdit={cardState.isEdit}
            />
          </div>
          <div className={star} onClick={handleIsPriority}></div>
        </div>

        <div className={styled.card_wrapper}>
          <div className={styled.card_container}>
            <input
              className={
                cardState.isEdit
                  ? styled.card_input
                  : styled.card_input_disActive
              }
              type="text"
              placeholder="Enter quest name"
              name="name"
              value={cardState.name}
              // autoFocus={inFocus}

              required
              onChange={changeName}
            />
            <div className={styled.date}>
              <DatePicker
                className={styled.date_picker}
                selected={cardState.dueDate}
                value={cardState.dueDate}
                onChange={handleChange}
                // dateFormat="YYYY-MM-DD"
                clearIcon={!cardState.isEdit && null}
                disabled={!cardState.isEdit}
                locale="ua-GB"
              />

              {new Date(dueDate).getDate() === new Date(Date.now()).getDate() &&
                !cardState.isEdit && !done && <div className={styled.fire} />}
            </div>
          </div>
          <div className={styled.card_block}>
            <div className={css.card_category}>
              <SelectCategory
                defaultSelectColor={selectState.defaultSelectColor}
                onSelectChange={event => onSelectChange(event.target.value)}
                group={cardState.group}
                isEdit={cardState.isEdit}
              />
            </div>
            {cardState.isEdit && !startFlag && (
              <ButtonsManipulate
                deleteCard={deleteCard}
                showModal={showModal}
                id={_id}
                saveCard={saveCard}
                title={cardState.name}
                cardState={cardState}
                isTaskDone={isTaskDone}
                isQuest={isQuest}
              />
            )}
            {startFlag && cardState.isEdit && (
              <Buttons
                resetStartFlag={resetStartFlag}
                updateCard={updateCard}
                deleteCard={deleteCard}
                id={_id}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
  {
    
  }
 
}

export default Card;
