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
function CardChallenge({ arr, resetEditFlag, resetStartFlag, startFlag, setEditFlagTrue, editFlag }) {
  const { dueDate, name, group, difficulty, _id, challengeSendToUser, isEdit, isQuest, userId } = arr;
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
  };
  const updateCard = async () => {
    dispatch(editChallenge(_id, cardState.dueDate, cardState.difficulty));
    setCardState((prev) => ({ ...prev, isEdit: false }));
    resetStartFlag();
    // resetEditFlag();
    // console.log('тиск дискетку')
  };
  const isTaskDone = () => {
    setCardState((prev) => ({ ...prev, done: !prev.done }));
  };
  const changeIsEdit = (e) => {
    if (editFlag) return;
    setCardState((prev) => ({ ...prev, isEdit: true }));
    setEditFlagTrue();
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
        <div className={styled.card_container}>
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
          />
        </div>
        <div className={styled.card_block}>
          <div className={styled.card_category}>
            <SelectCategory
              defaultSelectColor={selectState.defaultSelectColor}
              onSelectChange={(event) => onSelectChange(event.target.value)}
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
              updateCard={updateCard}
              isTaskDone={isTaskDone}
            />
          )}
        </div>
      </div>
    </>
  );
}
export default CardChallenge;

// import React, { useState } from "react";
// import { css } from "emotion";
// import DatePicker from "react-date-picker";
// import styled from "./card.module.css";
// import Select from "./Select";
// import { useDispatch } from "react-redux";
// import SelectCategory from "./SelectCategory";
// import easydate from "easydate";
// import DeleteQuestModal from "./DeleteQuestModal";
// import CompletedChallenge from "./CompletedChallenge";
// import { removeCard, changeCard } from "../../redux/dashboardOperations";
// import axios from "axios";
// import { startChallenge } from "../../redux/dashboardOperations";
// import Buttons from "./Buttons";
// import ButtonsManipulate from "./ButtonsManipulate";
// import { deleteChallenge } from "../../redux/dashboardOperations";

// function CardChallenge({ arr, resetEditFlag, resetStartFlag, startFlag, setEditFlagTrue }) {
//   const { dueDate, name, group, difficulty, _id, challengeSendToUser } = arr;
//   console.log("arr._id", _id);


//   const initialState = {
//     name: name,
//     difficulty: difficulty,
//     group: group,
//     dueDate: new Date(dueDate),
//     challengeSendToUser: false,
//     defaultSelectColor: "card_category",
//     defaultSelectGroupClr: "card_item",
//   };

//   const [cardState, setCardState] = useState(initialState);


//   const onSelectColor = (value) => {
//     setCardState((prev) => ({

//       ...prev,
//       defaultSelectGroupClr: value + "_select",
//     }));
//   };

//   const onSelectChange = (value) => {
//     // console.log("value :>> ", value);
//     setCardState((prev) => ({
//       ...prev,
//       defaultSelectColor: value + "_category",
//     }));
//   };

//   const dispatch = useDispatch();


//   // const deleteCard = (_id) => {
//   //   dispatch(removeCard(_id));
//   // };


//   const handleChange = (props) => {
//     setCardState((prev) => ({ ...prev, dueDate: props }));
//     // console.log("dueDate", dueDate);
//     // console.log(
//     //   "dueDateEasy",
//     //   easydate("Y-M-dTh:m:s.000Z", { setDate: cardState.dueDate })
//     // );
//     // console.log("props", props);
//   };

//   const showModal = () => {
//     setCardState(true);
//   };

//   const closeModal = () => {
//     setCardState(false);
//   };

//   // const updateCard = () => {
//   //   const correctCardData = {
//   //     ...cardState,
//   //     dueDate: easydate("Y-M-dTh:m:s.000Z", { setDate: cardState.dueDate }),
//   //   };
//   //   // console.log("prepairData", correctCardData);
//   //   dispatch(changeCard(_id, correctCardData));
//   //   resetEditFlag();
//   //   // setCardState((prev) => ({...prev, challengeSendToUser: true}))
//   //   // console.log('cardState.challengeSendToUser', cardState.challengeSendToUser)
//   // };

//   // const startHandle = () => {
//   //   setCardState((prev) => ({...prev, challengeSendToUser: true}))
//   //   console.log('cardState', cardState)
//   // }

//   const deleteCard = (_id) => {
//     dispatch(deleteChallenge(_id));
//     // resetEditFlag();
//     // resetStartFlag();
//   };

//   const updateCard = async () => {
//     console.log("111111", 111111);
//     console.log("challenge_id", _id);
//     dispatch(startChallenge(_id));
//   };

//   const isTaskDone = () => {
//     setCardState((prev) => ({ ...prev, done: !prev.done }));
//   };

//   const changeIsEdit = (e) => {
//     if (!challengeSendToUser) return;
//     setCardState((prev) => ({ ...prev, isEdit: true }));
//     setEditFlagTrue();
//   };


//   // const tempCard = arr;
//   // const { dueDate, name, group } = tempCard;
//   // console.log('difficulty', difficulty)
//   // let [value, setValue] = useState(new Date(dueDate));
//   // let [selectOption, setSelectOption] = useState(difficulty.toLowerCase())
//   // console.log('selectOption', selectOption)

//   return (
//     <>
//       {/* <div className={styled.card_list}> */}
//       {/* {!challengeSendToUser &&  */}
//       <div onClick={changeIsEdit} className={styled.card_background}>
//         <div className={styled.card_header}>
//           <div className={styled.card_item}>
//             <Select
//               defaultSelectGroupClr={cardState.defaultSelectGroupClr}

//               onSelectColor={(event) => onSelectColor(event.target.value)}
//               difficulty={difficulty}
//             />
//           </div>

//           <div className={styled.trophy_icon}></div>
//         </div>
//         <div className={styled.card_container}>
//           <p className={styled.card_challenge}>Challenge</p>
//           <h2 className={styled.card_title}>{name}</h2>
//         </div>

//         <div className={styled.date}>
//           <DatePicker

//             className={styled.date_pickerChallenge}

//             selected={cardState.dueDate}
//             value={cardState.dueDate}
//             onChange={handleChange}
//             dateFormat="YYYY-MM-DD"

//             // clearIcon={!cardState.isEdit && null}
//             // disabled={!cardState.isEdit}

//           />
//         </div>
//         {/* <div className={styled.date_challenge}>
//                 <input className={styled.card_input__date} type="text" value="02.06.2020 10:13 PM"/>
//                 <button className={styled.card_btn__icon}></button>
//                 {/* <div>Calendar</div> */}
//         {/* </div>             */}
//         {/* </div> */}
//         <div className={styled.card_block}>
//           <div className={styled.card_category}>
//             <SelectCategory
//               onSelectChange={onSelectChange}
//               defaultSelectColor={cardState.defaultSelectColor}
//               onSelectChange={(event) => onSelectChange(event.target.value)}
//               // onSelectChange={onSelectChange}
//               group={cardState.group}
//             />
//           </div>

//           {!challengeSendToUser && (
//             <Buttons
//               updateCard={updateCard}
//               deleteCard={deleteCard}
//               id={_id}
//               resetStartFlag={resetStartFlag}
//             />
//           )}

//           {challengeSendToUser && cardState.isEdit && (
//             <ButtonsManipulate
//               cardState={cardState}
//               deleteCard={deleteCard}
//               id={_id}
//               updateCard={updateCard}
//               isTaskDone={isTaskDone}
//             />
//           )}

//           {/* {challengeSendToUser && } */}
//           {/* <div className={styled.card_btn__create}>
//             <button
//               onClick={() => showModal()}

//               className={styled.delete}
//             ></button>
//             {!cardState && (
//               <DeleteQuestModal
//                 deleteCard={deleteCard}
//                 id={_id}
//                 closeModal={closeModal}
//               />
//             )}

//             <div className={styled.strip}></div>
//             <button onClick={startHandleChallenge} className={styled.start}>
//               Start
//             </button>
//           </div> */}

//         </div>
//       </div>
//     </>
//   );
// }

// export default CardChallenge;
