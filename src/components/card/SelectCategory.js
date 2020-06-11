import React from 'react';
import styled from './select.module.css';

const SelectCategory = props => {
  const getColor = (props = 'stuff') => {
    switch (props) {
      case 'stuff':
        return '#eceff1';
      case 'learning':
        return '#fcf2b7';
      case 'health':
        return 'rgb(204, 247, 255)';
      case 'work':
        return 'rgb(211, 246, 206)';
      case 'leisure':
        return 'rgb(238, 216, 242)';
      case 'productivity':
        return 'rgb(209, 225, 246)';
      case 'social':
        return 'rgb(233, 192, 203)';
      case 'sport':
        return 'rgb(186, 241, 229)';

      default:
        return '#eceff1';
    }
  };

  const getBoxShadow = (props = 'stuff') => {
    switch (props) {
      case 'stuff':
        return 'rgb(236, 239, 241) -22px 0px 0px 0px';
      case 'learning':
        return 'rgb(252, 242, 183) -22px 0px 0px 0px';
      case 'health':
        return 'rgb(204, 247, 255) -22px 0px 0px 0px';
      case 'work':
        return 'rgb(211, 246, 206) -22px 0px 0px 0px';
      case 'leisure':
        return 'rgb(238, 216, 242) -22px 0px 0px 0px';
      case 'productivity':
        return 'rgb(209, 225, 246) -22px 0px 0px 0px';
      case 'social':
        return 'rgb(233, 192, 203) -22px 0px 0px 0px';
      case 'sport':
        return 'rgb(186, 241, 229) -22px 0px 0px 0px';

      default:
        return 'rgb(236, 239, 241) -22px 0px 0px 0px';
    }
  };

  const selectedOption = props.group.toLowerCase();
 
  const isDisabled = !props.isEdit && 'disabled';

  return (
    <select
      disabled={isDisabled}
      value={selectedOption}
      className={styled[props.defaultSelectColor]}
      onChange={props.onSelectChange}
      style={{
        backgroundColor: getColor(props.group.toLowerCase()),
        boxShadow: getBoxShadow(props.group.toLowerCase()),
        fontFamily: "HelveticaNeueCyr",
      }}
    >
      <option value="stuff" className={styled.stuff_category}>
        STUFF
      </option>
      <option value="learning" className={styled.learning_category}>
        LEARNING
      </option>
      <option value="health" className={styled.health_category}>
        HEALTH
      </option>
      <option value="work" className={styled.work_category}>
        WORK
      </option>
      <option value="leisure" className={styled.leisure_category}>
        LEISURE
      </option>
      <option value="productivity" className={styled.productivity_category}>
        PRODUCTIVITY
      </option>
      <option value="social" className={styled.social_category}>
        SOCIAL
      </option>
      <option value="sport" className={styled.sport_category}>
        SPORT
      </option>
    </select>
  );
};

export default SelectCategory;
