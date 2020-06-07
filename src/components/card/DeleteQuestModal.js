import React from "react";
import css from "./modal.module.css";

const DeleteQuestModal = ({ deleteCard, id, closeModal }) => (
  <>
    <div className={css.wrap}>
      <div className={css.delete_box}>
        <h2 className={css.title}>Delete this Quest?</h2>
        <div className={css.button_wrap}>
          <button onClick={() => closeModal()} className={css.cancel}>
            CANCEL
          </button>
          <span className={css.slash}>|</span>
          <button onClick={() => deleteCard(id)} className={css.delete}>
            DELETE
          </button>
        </div>
      </div>
    </div>
  </>
);

export default DeleteQuestModal;
