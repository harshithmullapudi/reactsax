import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';

import Checkbox from '../../checkbox/checkbox';

import './option.scss';

function Option(props) {
  const { option, isMultiple, parentValue, clickOption, index, hoverIndex, textFilter } = props;
  const { disabled, value, label } = option;

  const isActive = () => {
    if (!parentValue) {
      return false;
    }

    return typeof parentValue == 'number'
      ? parentValue == value
      : parentValue.indexOf(value) !== -1;
  };

  const [hiddenState, setHiddenState] = useState(false);
  const [activeOption, setActiveOption] = useState(isActive());
  const buttonRef = useRef(null);

  useEffect(() => {
    setActiveOption(isActive());
  }, [parentValue]);

  useEffect(() => {
    buttonRef.current.addEventListener('mousedown', () => {
      clickOption(value, label);
    });
  }, []);

  useEffect(() => {
    if (textFilter) {
      if (label.toLowerCase().indexOf(textFilter.toLowerCase()) === -1) {
        setHiddenState(true);
      } else {
        setHiddenState(false);
      }
    } else {
      setHiddenState(false);
    }
  }, [textFilter]);

  const getCheckbox = () => {
    return (
      <>
        <Checkbox checked={activeOption} />
        {label}
      </>
    );
  };

  return (
    <button
      ref={buttonRef}
      disabled={disabled}
      className={classnames(
        'rs-select__option',
        {
          activeOption: activeOption,
        },
        {
          isHover: hoverIndex === index,
        },
        {
          isMultiple: isMultiple,
        },
        {
          hiddenOption: hiddenState,
        },
      )}
    >
      {isMultiple && getCheckbox()}
      {!isMultiple && label}
    </button>
  );
}

export default Option;
