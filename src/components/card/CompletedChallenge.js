import React from 'react'
import styled from './cardCompleted.module.css'


export const CompletedChallenge = ({ title, updateCard }) => {
    return (
        <>
        <li className={styled.card_item__challenge}>
            <div className={styled.card_header__challenge}>
                <p className={styled.card_title__challenge}>
                    Completed:
                    <a href="#" className={styled.title_ref}>
                {title}
              </a>
                    {/* <a href="#" className={styled.title_ref}>Title</a> */}
                </p>
                <button onClick={updateCard} className={styled.card_act}>
              Continue
              <div className={styled.card_arrow}></div>
            </button>
            </div>        
        </li>
        </>
    
)};

