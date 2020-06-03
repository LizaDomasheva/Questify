import React from 'react'
import styled from './card.module.css'


const CardChallenge = () => {
    return (
    <div className={styled.card_list}>
        <li className={styled.card_background}>
        <div className={styled.card_header}>
        <div className={styled.card_select}>Easy
        <div className={styled.card_select_icon}></div>
        </div>
        <div className={styled.trophy_icon}></div>
        </div>
        <div className={styled.card_container}>
            <p className={styled.card_challenge}>Challenge</p>
            <h2 className={styled.card_title}>Title</h2>
            <div className={styled.date_challenge}>
                <input className={styled.card_input__date} type="text" value="02.06.2020 10:13 PM"/>
                <button className={styled.card_btn__icon}></button>
                {/* <div>Calendar</div> */}
            </div>            
        </div>
        <div className={styled.card_block}>
            <div className={styled.card_category}>
                productivity</div>
            <div className={styled.card_btn__create}>
                <button className={styled.delete}></button> 
                <div className={styled.strip}></div>              
                <button className={styled.start}>Start</button>
            </div>            
        </div>
    </li>
    </div>
    
)};

export default CardChallenge;