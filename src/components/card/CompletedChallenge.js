import React from 'react'
import styled from './cardCompleted.module.css'


export const CompletedChallenge = () => {
    return (
        <>
        <li className={styled.card_item__challenge}>
            <div className={styled.card_header__challenge}>
                <p className={styled.card_title__challenge}>Completed:
                    <a href="#" className={styled.title_ref}>Title</a>
                </p>
                <button className={styled.card_act}>Continue
                <div className={styled.card_arrow}></div>
                </button>
            </div>        
        </li>
        </>
    
)};