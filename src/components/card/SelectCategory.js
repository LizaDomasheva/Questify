import React from 'react'
import styled from '../card/select.module.css'

const SelectCategory = (props) => {
    return(
      <select className={styled[props.defaultSelectColor]} onChange={props.onSelectChange} >
      <option value="stuff" className={styled.stuff_category}>STUFF</option>
      <option value="learning" className={styled.learning_category}>LEARNING</option>
      <option value="health" className={styled.health_category}>HEALTH</option>
      <option value="work" className={styled.work_category}>WORK</option>
      <option value="leisure" className={styled.leisure_category}>LEISURE</option>
      <option value="productivity" className={styled.productivity_category}>PRODUCTIVITY</option>
      <option value="social" className={styled.social_category}>SOCIAL</option>
      <option value="sport" className={styled.sport_category}>SPORT</option>
    </select>
  )}

export default SelectCategory;


