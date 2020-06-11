import React from 'react';
import styled from './select.module.css';

import easy from '../../assets/images/icons/round/btn.svg';
import normal from '../../assets/images/icons/round/green.svg';
import hard from '../../assets/images/icons/round/red.svg';

const getRound = props => {
  switch (props) {
    case 'easy':
      return `url(${easy})`;
    case 'normal':
      return `url(${normal})`;
    case 'hard':
      return `url(${hard})`;
    default:
      return `url(${easy})`;
  }
};


const Select = props => {
  const selectedOption = props.difficulty;
  const isDisabled = !props.isEdit && 'disabled';

  return (
    <select
      disabled={isDisabled}
      value={selectedOption}

     
      style={{
        backgroundColor: "transparent",
        backgroundRepeat: 'no-repeat',
        backgroundSize: '10px',
        backgroundPosition: '5px',
        height: '25px',
        paddingLeft: '20px',
        border: 'none',
        outline: 'none',
        width: '110px',
        fontFamily: 'HelveticaNeueCyr,sans-serif',
        fontSize: '15px',
        color: '#7a7a7a',
        backgroundImage: getRound(props.difficulty),
      }}
      onChange={props.onSelectColor}
    >

      {props.isQuest===false ? (
        <option
          style={{ backgroundColor: '#20395a', border: '#20395a'}}
          value="easy"
          className={styled.easy_select}
        >
          Easy
        </option>
      ) : (
        <option value="easy" className={styled.easy_select}>
          Easy
        </option>
      )}
      {props.isQuest ===false ? (
        <option
          style={{ backgroundColor: '#20395a', border: '#20395a' }}
          value="normal"
          className={styled.easy_select}
        >
          Normal
        </option>
      ) : (
        <option value="normal" className={styled.easy_select}>
          Normal
        </option>
      )}
      {props.isQuest ===false ? (
        <option
          style={{ backgroundColor: '#20395a', border: '#20395a' }}
          value="hard"
          className={styled.easy_select}
        >
          Hard
        </option>
      ) : (
        <option value="hard" className={styled.easy_select}>
          Hard
        </option>
      )}
    </select>
  );
};
export default Select;

