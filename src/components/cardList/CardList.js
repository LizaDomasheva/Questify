import React from 'react'
import Card from '../card/Card'
import styled from "../card/card.module.css";
import CardChallenge from '../card/CardChallenge';

const CardList = ({arr, challengeSendToUser}) => {
    // console.log("challengeSendToUser = ", challengeSendToUser) 
        
    
    return (
        
        <ul className={styled.card_list}>
            {arr.map(card=>(<li data-id={card._id} key={card._id} className={card.isEdit ? styled.card_active : styled.card_border}>
                { !card.hasOwnProperty('challengeSendToUser')  &&
                <Card arr={card}/>}
                { card.hasOwnProperty('challengeSendToUser')  &&
                <CardChallenge arr={card}/>}
        

                </li>))}
                
        </ul>

    
)};

export default CardList;