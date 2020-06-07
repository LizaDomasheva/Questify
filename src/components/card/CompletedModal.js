import React from "react";
import styled from "./cardCompleted.module.css";
import { useDispatch } from "react-redux";
import {changeCard} from '../../redux/dashboardOperations'

export const CompletedModal = ({ title, updateCard }) => {

  return (
    <div className={styled.card_list}>
      <ul>
        <li className={styled.card_item}>
          <div className={styled.card_header}>
            <p className={styled.card_title}>
              Completed:
              <a href="#" className={styled.title_ref}>
                {title}
              </a>
            </p>
            <button onClick={updateCard} className={styled.card_act}>
              Continue
              <div className={styled.card_arrow}></div>
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};
