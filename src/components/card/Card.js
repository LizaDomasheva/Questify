import React from "react";
import styled from "./card.module.css";
import Select from 'react-select';
// import { colourOptions } from '../data';
// import chroma from 'chroma-js';


// export const colourOptions = [
//   { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
//   { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
//   { value: 'purple', label: 'Purple', color: '#5243AA' },
//   { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
//   { value: 'orange', label: 'Orange', color: '#FF8B00' },
//   { value: 'yellow', label: 'Yellow', color: '#FFC400' },
//   { value: 'green', label: 'Green', color: '#36B37E' },
//   { value: 'forest', label: 'Forest', color: '#00875A' },
//   { value: 'slate', label: 'Slate', color: '#253858' },
//   { value: 'silver', label: 'Silver', color: '#666666' },
// ];

// export const flavourOptions = [
//   { value: 'vanilla', label: 'Vanilla', rating: 'safe' },
//   { value: 'chocolate', label: 'Chocolate', rating: 'good' },
//   { value: 'strawberry', label: 'Strawberry', rating: 'wild' },
//   { value: 'salted-caramel', label: 'Salted Caramel', rating: 'crazy' },
// ];


// const colourStyles = {
//   control: styles => ({ ...styles, backgroundColor: 'white' }),
//   option: (styles, { data, isDisabled, isFocused, isSelected }) => {
//     const color = chroma(data.color);
//     return {
//       ...styles,
//       backgroundColor: isDisabled
//         ? null
//         : isSelected
//         ? data.color
//         : isFocused
//         ? color.alpha(0.1).css()
//         : null,
//       color: isDisabled
//         ? '#ccc'
//         : isSelected
//         ? chroma.contrast(color, 'white') > 2
//           ? 'white'
//           : 'black'
//         : data.color,
//       cursor: isDisabled ? 'not-allowed' : 'default',

//       ':active': {
//         ...styles[':active'],
//         backgroundColor: !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
//       },
//     };
//   },
//   multiValue: (styles, { data }) => {
//     const color = chroma(data.color);
//     return {
//       ...styles,
//       backgroundColor: color.alpha(0.1).css(),
//     };
//   },
//   multiValueLabel: (styles, { data }) => ({
//     ...styles,
//     color: data.color,
//   }),
//   multiValueRemove: (styles, { data }) => ({
//     ...styles,
//     color: data.color,
//     ':hover': {
//       backgroundColor: data.color,
//       color: 'white',
//     },
//   }),
// };


const Card = () => {
  return (
    <div className={styled.card_list}>
      <li className={styled.card_border}>
        <div className={styled.card_header}>
          <div className={styled.card_select}>
            {/* <Select
                closeMenuOnSelect={false}
                defaultValue={[colourOptions[0], colourOptions[1]]}
                isMulti
                options={colourOptions}
                styles={colourStyles}
              /> */}
            <div className={styled.card_select_icon}></div>
          </div>
          <div className={styled.star_icon}></div>
        </div>
        <div className={styled.card_wrapper}>
            <div className={styled.card_container}>
            <input
                className={styled.card_input}
                type="text"
                placeholder="Enter quest name"
                name="text"
                required
            />
            <div className={styled.date}>
                <input
                className={styled.card_input__date}
                type="text"
                value="02.06.2020 10:13 PM"
                />
                <button className={styled.card_btn__icon}></button>
                {/* <div>Calendar</div> */}
            </div>
            </div>
            <div className={styled.card_block}>
            <div className={styled.card_category}>productivity</div>
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
    </div>
  );
};

export default Card;
