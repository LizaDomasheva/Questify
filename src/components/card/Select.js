import React from "react";
import styled from "./select.module.css";
import easy from "../../assets/images/icons/round/btn.svg";
import normal from "../../assets/images/icons/round/green.svg";
import hard from "../../assets/images/icons/round/red.svg";

const getColor = (props = "easy") => {
  switch (props) {
    case "easy":
      return "easy_select";
    case "normal":
      return "normal_select";
    case "hard":
      return "hard_select";
    default:
      return "easy_select";
  }
};

const getRound = (props) => {
  switch (props) {
    case "easy":
      return `url(${easy})`;
    case "normal":
      return `url(${normal})`;
    case "hard":
      return `url(${hard})`;
    default:
      return `url(${easy})`;
  }
};

const image = "../../assets/images/icons/round/btn.svg";
// console.log("image", image);

const Select = (props) => {
  const selectedOption = props.difficulty;
  // console.log("selected", selectedOption);
  return (
    <select
      value={selectedOption}
      // style={{

      // }}
      // className={getColor(props.difficulty)}
      // style={{backgroundImage: }}
      style={{
        backgroundColor: getColor(props.difficulty.toLowerCase()),
        backgroundRepeat: "no-repeat",
        backgroundSize: "10px",
        backgroundPosition: "5px",
        width: "90px",
        height: "25px",
        paddingLeft: "20px",
        border: "none",
        outline: "none",
        width: "110px",
        fontFamily: "HelveticaNeueCyr,sans-serif",
        fontSize: "15px",
        color: "#b6c4ca",
        backgroundImage: getRound(props.difficulty),
        // borderRadius: '50%',
        // backgroundImage: "url('../../assets/images/icons/round/btn.svg')",
      }}
      // className={getColor(selectedOption)}
      // className={styled[props.defaultSelectGroupClr]}
      onChange={props.onSelectColor}
    >
      <option value="easy" className={styled.easy_select}>
        Easy
      </option>
      <option value="normal" className={styled.normal_select}>
        Normal
      </option>
      <option value="hard" className={styled.hard_select}>
        Hard
      </option>
    </select>
  );
};

export default Select;
