import React from 'react';
import { useDispatch } from 'react-redux'
import styled from './cardCompleted.module.css'
import { doneChallenge } from "../../redux/dashboardOperations";

export const CompletedChallenge = ({ title, id, userId }) => {
    const dispatch = useDispatch();
    const finishedChallenge = () => {
        dispatch(doneChallenge(id, userId));
      };
    return (
        <>
        <div className={styled.card_item__challenge}>
            <div className={styled.card_header__challenge}>
                <p className={styled.card_title__challenge}>Completed:
                    <a href="#" className={styled.title_ref}>{title}</a>
                </p>
                <button onClick={finishedChallenge} className={styled.card_act}>Continue
                <div className={styled.card_arrow}></div>
                </button>
            </div>        
        </div>
        </>
    
)};