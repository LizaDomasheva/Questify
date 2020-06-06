import React from 'react'
import styled from '../card/select.module.css'



const Select = props => {
 
    return(
<select className={styled[props.defaultSelectGroupClr]} onChange={props.onSelectColor}>
  <option value="easy" className={styled.easy_select}>Easy</option>
    <option value="normal" className={styled.normal_select}>Normal</option>
    <option value="hard" className={styled.hard_select}>Hard</option>
</select>
)}

export default Select;