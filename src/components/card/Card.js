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
  const { dueDate, name, isPriority, group, difficulty, _id, isEdit } = arr;

  const initialState = {
    name: name.length > 15 ? name.slice(0, 15) + '...' : name,
    difficulty: difficulty,
    group: group,
    isPriority: isPriority,
    dueDate: new Date(dueDate),
    isEdit: isEdit,
  };
  console.log('new Date(dueDate) :>> ', new Date(dueDate).getDate());
  console.log('new Date(Date.now) :>> ', new Date(Date.now()).getDate());
  const selectInitialState = {
    // defaultSelectColor: group + 'card_category',
    // defaultSelectColor: group ? (group + "_category") : 'card_category',
    defaultSelectColor: 'card_category',

    // defaultSelectGroupClr: difficulty + "_select",
    defaultSelectGroupClr: 'card_item',
  };

  // const selectInitialState = {
  //     defaultSelectColor: group + 'card_category',
  //     // defaultSelectColor: group ? (group + "_category") : 'card_category',
  //     // defaultSelectColor: "card_category",

  //     defaultSelectGroupClr: difficulty + "_select",
  //     // defaultSelectGroupClr: "card_item",

  //   };

  const [cardState, setCardState] = useState(initialState);
  const [selectState, setSelectState] = useState(selectInitialState);
  const changeName = ({ target: { name, value } }) => {
    if (!cardState.isEdit) return;
    setCardState(prev => ({ ...prev, [name]: value }));
  };

  // const onSelectColor = (value) => {
  //   // console.log('valueColor :>> ', value);
  //   // setSelectState(() => ({ defaultSelectGroupClr: value + '_select' }));
  //   setCardState((prev) => ({
  //     ...prev,
  //     defaultSelectGroupClr: value + "_select",
  //   }));
  // };

  // const onSelectChange = (value) => {
  //   // console.log('value :>> ', value);
  //   // setSelectState(() => ({ defaultSelectColor: value + '_category' }));
  //   setCardState((prev) => ({
  //     ...prev,
  //     defaultSelectColor: value + "_category",
  //   }));
  // };


  const onSelectColor = value => {
    setSelectState(prev => ({

      ...prev,
      defaultSelectGroupClr: value + '_select',
    }));
    setCardState(prev => ({
      ...prev,
      // defaultSelectGroupClr: value + '_select',
      difficulty: value,
    }));
  };

  const onSelectChange = value => {
    setSelectState(prev => ({
      // ...prev,
      defaultSelectColor: value + '_category',
    }));
    console.log('selectState', selectState);
    setCardState(prev => ({
      ...prev,
      // defaultSelectColor: value + '_category',
      group: value,
    }));
  };

  // const onSelectChange = e => {
  //   console.log('e.target.value', e.target.value);
  //   setCardState(prev => ({ ...prev, group: e.target.value }));
  // };

  const handleChange = props => {
    if (!cardState.isEdit) return;
    setCardState(prev => ({ ...prev, dueDate: props }));
    // console.log("dueDate", dueDate);
    // console.log(
    //   "dueDateEasy",
    //   easydate("Y-M-dTh:m:s.000Z", { setDate: cardState.dueDate })
    // );
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

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  const updateCard = () => {
    const correctCardData = {
      ...cardState,
      dueDate: easydate('Y-M-dTh:m:s.000Z', { setDate: cardState.dueDate }),
    };
    // console.log("prepairData", correctCardData);
    dispatch(changeCard(_id, correctCardData));
    resetEditFlag();
  };

  // const onSelectChange = (e) => {
  //   // console.log("e.target.value", e.target.value);
  //   setCardState((prev) => ({ ...prev, group: e.target.value }));
  // };

  const isTaskDone = () => {
    setCardState(prev => ({ ...prev, done: !prev.done }));
  };

  const editState = () => {
    setCardState(prev => ({ ...prev, isEdit: true }));
    // console.log("cardState", cardState);
  };

  const changeIsEdit = e => {
    if (editFlag) return;
    editStateTest(e);
    setCardState(prev => ({ ...prev, isEdit: true }));
    // console.log("editFlagDiv", editFlag);
    // console.log("cardState", cardState);
    setEditFlagTrue();
  };

  return (
    <>
      <div
        className={cardState.isEdit ? styled.card_active : styled.card_border}
        onClick={changeIsEdit}>
        <div className={styled.card_header}>
          <div className={styled.card_item}>
            {/* {console.log('cardState.difficulty', (cardState.difficulty.toLowerCase() === 'hard'))} */}
            <Select
              defaultSelectGroupClr={selectState.defaultSelectGroupClr}
              onSelectColor={event => onSelectColor(event.target.value)}
              difficulty={cardState.difficulty}
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
              // style={{backgroundColor: 'white'}}
              className={
                cardState.isEdit
                  ? styled.card_input
                  : styled.card_input_disActive
              }
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
                clearIcon={!cardState.isEdit && null}
                disabled={!cardState.isEdit}
              />
              {new Date(dueDate).getDate() === new Date(Date.now()).getDate() &&
                !cardState.isEdit && <div className={styled.fire} />}
            </div>
          </div>
          <div className={styled.card_block}>
            <div className={css.card_category}>
              <SelectCategory
                defaultSelectColor={selectState.defaultSelectColor}
                onSelectChange={event => onSelectChange(event.target.value)}
                group={cardState.group}
              />
            </div>
            {cardState.isEdit && !startFlag && (
              <ButtonsManipulate
                deleteCard={deleteCard}
                showModal={showModal}
                id={_id}
                updateCard={updateCard}
                title={cardState.name}
                cardState={cardState}
                isTaskDone={isTaskDone}
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
            {/* <Buttons deleteCard={deleteCard} showModal={showModal} id={_id}/> */}
            {/* <div className={styled.card_btn__create}>

Olia Melnyk, [09.06.20 15:35]
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
          </div> */}
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

export default Card;
