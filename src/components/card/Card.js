import React from 'react'
import styled from './card.module.css'


const Card = () => {
    return (
        <li className={styled.card_border}>
            <div className={styled.card_header}>
            <div className={styled.card_select}>Easy
            <div className={styled.card_select_icon}></div>
            </div>
            <div className={styled.star_icon}></div>
            </div>
            <div className={styled.card_container}>
                <input className={styled.card_input} type="text" placeholder="Enter quest name" name="text" required/>
                <div className={styled.date}>
                    <input className={styled.card_input__date} type="text" value="02.06.2020 10:13 PM"/>
                    <button className={styled.card_btn__icon}></button>
                    {/* <div>Calendar</div> */}
                </div>            
            </div>
            <div className={styled.card_block}>
                <div className={styled.card_category}>
                    productivity</div>
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
        </li>
    
)}

export default Card;