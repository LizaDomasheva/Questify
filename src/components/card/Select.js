import React from 'react'
import styled from '../card/select.module.css'




const Select = ({difficulty}) => {
  console.log('difficulty', difficulty)
    return(
<select className={styled.card_list} >
    <option value="easy" className={styled.card_select}>Easy</option>
    <option value="normal" className={styled.card_select}>Normal</option>
    <option value="hard" className={styled.card_select}>Hard</option>
</select>
)}

export default Select;
