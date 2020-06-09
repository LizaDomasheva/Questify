import React from 'react'

const initialCard = () => {

    

    return (
        <>
        <div className={styled.card_header}>
        <div className={styled.card_item}>
        <Select
          defaultSelectGroupClr={cardState.defaultSelectGroupClr}
          onSelectColor={event => onSelectColor(event.target.value)}
          difficulty={difficulty}
        />
        </div>
        {/* {isPriority ? (
          <div className={styled.star_icon} onClick={handleIsPriority}></div>
        ) : (
          <div className={styled.nostar_icon} onClick={handleIsPriority}></div>
        )} */}

        <div className={star} onClick={handleIsPriority}></div>
      </div>

      <div className={styled.card_wrapper}>
        <div className={styled.card_container}>
          <input
            className={styled.card_input}
            type="text"
            placeholder="Enter quest name"
            name="name"
            value={cardState.name}
            autoFocus
            required
            onChange={changeName}
          />
          <div className={styled.date}>
            <DatePicker
              className={styled.date_picker}
              selected={cardState.dueDate}
              value={cardState.dueDate}
              onChange={handleChange}
              dateFormat="YYYY-MM-DD"
            /> 
          </div>
        </div>
        <div className={styled.card_block}>
          <div className={styled.card_category}>
            <SelectCategory
              onSelectChange={onSelectChange}
              defaultSelectColor={cardState.defaultSelectColor}
              onSelectChange={event => onSelectChange(event.target.value)}
              // onSelectChange={onSelectChange}
              group={cardState.group}
            />
          </div>
          <div className={styled.card_btn__create}>
            {/* <button className={styled.delete}></button> 
                        <div className={styled.strip}></div>              
                        <button className={styled.start}>Start</button> */}

            <button onClick={updateCard} className={styled.save}></button>
            <div className={styled.strip}></div>
            <button
              onClick={() => showModal()}
              className={styled.delete}
            ></button>
            {isModalOpen && (
              <DeleteQuestModal
                deleteCard={deleteCard}
                id={_id}
                closeModal={closeModal}
              />
            )}
            <div className={styled.strip}></div>
            <button onClick={isTaskDone} className={styled.done}></button>
            {cardState.done && (
              <CompletedModal
                title={cardState.name}
                updateCard={updateCard}
                _id={_id}
                cardState={cardState}
              />
            )}
          </div>
        </div>
      </div>

        </>

    )
}

export default initialCard;