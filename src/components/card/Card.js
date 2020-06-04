import React, {useState} from "react";
import chroma from "chroma-js";
import { css } from 'emotion';
import DatePicker from 'react-date-picker';
import Select from 'react-select'
import styled from "./card.module.css";


const colourOptions = [
  { value: 'easy', label: 'Easy', color: '#0ed6ff', isFixed: true },
  { value: 'normal', label: 'Normal', color: '#00d500'},
  { value: 'hard', label: 'Hard', color: '#ff0335' },
];

const selectOptions = [
  { value: 'easy', label: 'Easy', color: '#0ed6ff', isFixed: true },
  { value: 'normal', label: 'Normal', color: '#00d500'},
  { value: 'hard', label: 'Hard', color: '#ff0335' },  
  { value: 'easy', label: 'Easy', color: '#0ed6ff',  },
  { value: 'normal', label: 'Normal', color: '#00d500'},
  { value: 'hard', label: 'Hard', color: '#ff0335' },
];


const dot = (color = '#ccc') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 15,
    height: 10,
    width: 10,
  },
});




function Card({todayCard}) {
  const optionHandleChange =(props)=>{
    setSelectOption(props)
  }
  
  const handleChange =(props)=>{
    setValue(props)
    console.log('tempData', props)
  }
  const tempCard = todayCard
    console.log('tempCard :>> ', tempCard.name);
    const {dueDate, name, isPriority, group, difficulty}=tempCard
    console.log('difficulty', difficulty)
    let [value, setValue] = useState(new Date(dueDate)) 
    let [selectOption, setSelectOption] = useState(difficulty.toLowerCase()) 
    console.log('selectOption', selectOption)
  
  return (
    <>
      <li className={styled.card_border}>
        <div className={styled.card_header}>
              <Select
                defaultValue={colourOptions[2]}
                label="Single select"
                options={colourOptions}
                styles={colourStyles}
                onChange={optionHandleChange}
                // value={{value:selectOption}}         
              />
            
  {isPriority && <div className={styled.star_icon}></div>}
        </div>
        <div className={styled.card_wrapper}>
            <div className={styled.card_container}>
            <input 
                className={styled.card_input}
                type="text"
                placeholder="Enter quest name"
                name="text"
                value={name}
                required
            />
            <div className={styled.date}>
          
                <DatePicker className={styled.date_picker} selected={value} value={value}
                      onChange={handleChange}/>
            </div>
            </div>
            <div className={styled.card_block}>
            <div className={styled.card_category}>  
            <Select
                closeMenuOnSelect={false}
                components={{ Option }}
                styles={{
                  option: base => ({
                    ...base,
                    border: `1px dotted ${selectOptions.color}`,
                    height: '100%',
                  }),
                }}
                defaultValue={selectOptions}
                options={selectOptions}
              />
            </div>
            <div className={styled.card_btn__create}>
                {/* <button className={styled.delete}></button> 
                        <div className={styled.strip}></div>              
                        <button className={styled.start}>Start</button> */}

                <button className={styled.save}></button>
                <div className={styled.strip}></div>
                <button className={styled.delete}></button>
                <div className={styled.strip}></div>
                <button className={styled.done}></button>
            </div>
            </div>
        </div>
      </li>            
    </>
  );
} 

const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: 'white', border:'none' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : null,
      color: isDisabled
        ? '#ccc'
        : isSelected
        ? chroma.contrast(color, 'white') > 2
          ? 'white'
          : 'black'
        : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
      },
    };
  },
  input: styles => ({ ...styles, ...dot(), width:70 }),
  placeholder: styles => ({ ...styles, ...dot() }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};



const Option = (props: OptionProps) => {
  const {
    children,
    className,
    cx,
    getStyles,
    isDisabled,
    isFocused,
    isSelected,
    innerRef,
    innerProps,
  } = props;
  return (
    <div
      ref={innerRef}
      className={cx(
        css(getStyles('option', props)),
        {
          option: true,
          'option--is-disabled': isDisabled,
          'option--is-focused': isFocused,
          'option--is-selected': isSelected,
        },
        className
      )}
      {...innerProps}
    >
      {children}
    </div>
  );
};

export default Card