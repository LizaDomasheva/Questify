import React from 'react'
import styled from './select.module.css'





const Select = props => {
 
    return(
<select className={styled[props.defaultSelectGroupClr]} onChange={props.onSelectColor}>
  <option data-img-src="../../assets/images/icons/round/btn.png" value="easy" className={styled.easy_select}>Easy</option>
    <option data-img-src="../../assets/images/icons/round/green.png" value="normal" className={styled.normal_select}> Normal</option>
    <option data-img-src="../../assets/images/icons/round/red.png" className={styled.hard_select}> Hard</option>
</select> 

)}

export default Select;




