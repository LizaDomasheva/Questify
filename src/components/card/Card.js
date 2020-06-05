import React, {useState} from "react";
import DatePicker from 'react-date-picker';
import styled from "./card.module.css";
import SelectCategory from '../card/SelectCategory'
import Select from '../card/Select'


function Card({todayCard}) {
  // const gethandleChange =(props)=>{
  //   setSelectOption(props)
    // console.log('tempData', props)
  
  

    const handleChange =(props)=>{
    setValue(props)
    console.log('tempData', props)
  }

  const tempCard = todayCard
    console.log('tempCard :>> ', tempCard.name);
    const {dueDate, name, isPriority, group, difficulty}=tempCard
    let [value, setValue] = useState(new Date(dueDate)) 


    // let [selectOption, setSelectOption] = useState(group) 
    // const Add = selectOption.map(Add => Add)
     
  return (
    <>
        <div className={styled.card_header}>
              <Select difficulty={difficulty}/>
            
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
              
            />
            <div className={styled.date}>
          
                <DatePicker className={styled.date_picker} selected={value} value={value} onChange={handleChange}/>
            </div>
            </div>
            <div className={styled.card_block}>            
              <SelectCategory group={group}/>
                       
            {/* </div> */}
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
    </>
  );
} 


export default Card