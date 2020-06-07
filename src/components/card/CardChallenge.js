import React, { useState } from 'react';
import { css } from 'emotion';
import DatePicker from 'react-date-picker';
import styled from './card.module.css';

function CardChallenge({ arr }) {
  const handleChange = props => {
    setValue(props);
    // console.log('tempData', props);
  };

  const tempCard = arr;
  const { dueDate, name, group } = tempCard;
  // console.log('difficulty', difficulty)
  let [value, setValue] = useState(new Date(dueDate));
  // let [selectOption, setSelectOption] = useState(difficulty.toLowerCase())
  // console.log('selectOption', selectOption)

  return (
    <>
      {/* <div className={styled.card_list}> */}
      {/* {!challengeSendToUser &&  */}
      <div className={styled.card_background}>
        <div className={styled.card_header}>
          <div className={styled.card_select}>
            Easy
            <div className={styled.card_select_icon}></div>
          </div>
          <div className={styled.trophy_icon}></div>
        </div>

        <div className={styled.card_container}>
          <p className={styled.card_challenge}>Challenge</p>
          <h2 className={styled.card_title}>{name}</h2>
        </div>

        <div className={styled.date}>
          <DatePicker
            className={styled.date_picker}
            selected={value}
            value={value}
            onChange={handleChange}
          />
        </div>

        {/* <div className={styled.date_challenge}>
                <input className={styled.card_input__date} type="text" value="02.06.2020 10:13 PM"/>
                <button className={styled.card_btn__icon}></button>
                {/* <div>Calendar</div> */}
        {/* </div>             */}
        {/* </div> */}

        <div className={styled.card_block}>
          <div className={styled.card_category}>productivity</div>
          <div className={styled.card_btn__create}>
            <button className={styled.delete}></button>
            <div className={styled.strip}></div>
            <button className={styled.start}>Start</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardChallenge;
