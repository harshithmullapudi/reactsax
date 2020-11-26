import React, { useRef, useState, useEffect } from 'react';
import classnames from 'classnames';
import t from 'prop-types';

import Option from './option/option';
import OptionGroup from './option_group/option_group';
import IconClose from '../../icons/close';
import IconArrow from '../../icons/arrow';

import getColor, { setCords, insertBody } from '../../util/index';
import { getHTMLElement } from '../../util/dom_utils';

import './select.scss';

const initialState = {
  targetSelectInput: false,
  activeOptions: false,
  targetSelect: false,
  activeFilter: false,
  textFilter: '',
  hoverOption: -1,
  targetClose: false,
  renderSelect: false,
};

function Select(props) {
  const {
    color,
    state,
    disabled,
    loading,
    block,
    multiple,
    filter,
    onFocus,
    onBlur,
    value,
    label,
    labelPlaceholder,
    name,
    placeholder,
    onChange,
    collapseChips,
    noData,
    renderNoData,
    data,
    message,
    showGroups,
  } = props;

  const [innerState, setInnerState] = useState(initialState);
  const inputRef = useRef(null);
  const placeholderRef = useRef(null);
  const chipsRef = useRef(null);
  const optionsRef = useRef(null);
  const selectRef = useRef(null);
  const chipsInputRef = useRef(null);
  const contentRef = useRef(null);

  const {
    activeOptions,
    targetSelect,
    targetSelectInput,
    activeFilter,
    textFilter,
    hoverOption,
    targetClose,
  } = innerState;

  useEffect(() => {
    setState({
      renderSelect: true,
    });

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      handleBlur();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (activeOptions) {
      insertOptions();
    }
  }, [activeOptions]);

  useEffect(() => {
    handleValue(value);
  }, [value]);

  useEffect(() => {
    handleTextFilter(textFilter);
  }, [textFilter]);

  // Util function
  const setState = (obj) => {
    setInnerState({ ...innerState, ...obj });
  };

  const handleTextFilter = (val) => {
    if (val) {
      if (placeholder) {
        getHTMLElement(placeholderRef).style.transition = '0s';
      }
    } else {
      if (placeholder) {
        getHTMLElement(placeholderRef).style.transition = '';
      }
    }
  };

  const handleValue = (val) => {
    setTimeout(() => {
      onChange(val);
    }, 10);

    if (multiple) {
      const h = getHTMLElement(chipsRef).scrollHeight;
      getHTMLElement(inputRef).style.height = `${h}px`;
      const options = getHTMLElement(optionsRef);
      if (activeOptions) {
        setCords(options, getHTMLElement(selectRef));
      }
    }

    if (val) {
      if (placeholder) {
        getHTMLElement(placeholderRef).style.transition = '0s';
      }
    } else {
      if (placeholder) {
        getHTMLElement(placeholderRef).style.transition = '';
      }
    }
  };

  const insertOptions = () => {
    const options = getHTMLElement(optionsRef);
    insertBody(options, document.body);
    setCords(options, getHTMLElement(selectRef));
  };

  const clickOption = (value, label) => {
    if (multiple) {
      const oldVal = [value];
      if (oldVal.indexOf(value) == -1) {
        oldVal.push(value);
      } else {
        oldVal.splice(oldVal.indexOf(value), 1);
      }
      onChange(oldVal);
    } else {
      onChange(value);
    }

    setTimeout(() => {
      if (multiple && activeOptions) {
        getHTMLElement(chipsRef).focus();
      }
    }, 10);
    if (!multiple) {
      handleBlur();
    }
  };

  const setHover = () => {
    let index = -1;
    data.forEach((item, i) => {
      if (item.value == value) {
        index = i;
      }
    });

    setState({
      hoverOption: index,
    });
  };

  const getValueLabel = () => {
    const valLabel = value;
    let labels = [];
    if (Array.isArray(valLabel)) {
      valLabel.forEach((item) => {
        labels.push(item);
      });
    } else {
      labels = valLabel;
    }

    return labels;
  };

  const handleResize = () => {
    const options = getHTMLElement(optionsRef);
    if (!options) {
      return;
    }

    setCords(options, getHTMLElement(selectRef));

    for (let index = 0; index < 300; index++) {
      setTimeout(() => {
        setCords(options, getHTMLElement(selectRef));
      }, index);
    }
  };

  const handleScroll = () => {
    const options = getHTMLElement(optionsRef);
    if (options) {
      setCords(options, getHTMLElement(selectRef));
    }
  };

  const handleBlur = () => {
    if (onBlur) {
      onBlur();
    }

    setHover();
    if (activeOptions) {
      setState({
        textFilter: '',
      });
      if (!multiple) {
        setState({
          activeFilter: false,
        });
      }
    }

    setTimeout(() => {
      setState({
        activeOptions: false,
      });
    }, 100);
  };

  const handleKeydown = (evt) => {
    const options = getHTMLElement(optionsRef);
    for (let index = 0; index < 300; index++) {
      setTimeout(() => {
        setCords(options, getHTMLElement(selectRef));
      }, index);
    }
    if (evt.code === 'ArrowDown') {
      evt.preventDefault();
      if (hoverOption < data.length - 1) {
        setState({
          hoverOption: hoverOption + 1,
        });
      } else {
        setState({
          hoverOption: 0,
        });
      }
    } else if (evt.code === 'ArrowUp') {
      evt.preventDefault();
      if (hoverOption > 0) {
        setState({
          hoverOption: hoverOption - 1,
        });
      } else {
        setState({
          hoverOption: data.length - 1,
        });
      }
    } else if (evt.code === 'Enter') {
      evt.preventDefault();
      if (hoverOption !== -1) {
        if (!data[hoverOption].disabled) {
          clickOption(data[hoverOption].value, data[hoverOption].label);
          if (!multiple) {
            handleBlur();
            getHTMLElement(inputRef).blur();
          }
        }
      }
    }

    if (hoverOption !== -1) {
      // getHTMLElement(contentRef).scrollTop = data[hoverOption].$el.offsetTop - 66
    }
  };

  const blur = (evt) => {
    if (!multiple) {
      handleBlur();
    } else {
      if (!evt.relatedTarget) {
        handleBlur();
      } else if (!targetSelectInput || (!targetSelect && !activeOptions)) {
        handleBlur();
      }
    }
    if (filter) {
      setState({
        activeFilter: false,
      });
    }
  };

  const handleWindowClick = (evt) => {
    if (!targetSelectInput) {
      handleBlur();
    }

    if (filter && !activeOptions) {
      setState({
        activeFilter: false,
      });
    }

    if (evt.target == getHTMLElement(inputRef) && activeOptions && !filter) {
      handleBlur();
      setTimeout(() => {
        getHTMLElement(inputRef).blur();
      }, 100);
    }
  };

  // components
  const getChipsContent = () => {
    const chip = (item, isCollapse) => {
      return (
        <span
          className={classnames('rs-select__chips__chip', {
            isCollapse: isCollapse,
          })}
          data-value={item.value}
        >
          {item.label}
          {!isCollapse && (
            <span
              className="rs-select__chips__chip__close"
              onClick={(evt) => {
                evt.stopPropagation();
                setTimeout(() => {
                  setState({
                    targetClose: false,
                  });
                }, 100);
                if (!activeOptions) {
                  getHTMLElement(chipsRef).blur();
                  if (filter) {
                    getHTMLElement(chipsInputRef).blur();
                  }
                }
                clickOption(item.value, item.label);
              }}
            >
              <IconClose hover="less" />
            </span>
          )}
        </span>
      );
    };

    let chips = [];
    if (Array.isArray(value)) {
      value.forEach((item) => {
        chips.push(
          chip(
            {
              label: item,
              value: item,
            },
            false,
          ),
        );
      });
    }

    if (collapseChips) {
      chips = [
        chips[0],
        chips.length > 1 && chip({ label: `+${chips.length - 1}`, value: null }, true),
      ];
    }

    return chips;
  };

  const getOptionComponents = () => {
    if (showGroups) {
      const newData = data.sort((a, b) => a.group.toLowerCase() < b.group.toLowerCase());

      let groups = newData.map((option) => option.group);

      groups = groups.filter((item, pos) => {
        return groups.indexOf(item) == pos;
      });

      return (
        <>
          {groups.map((group) => (
            <OptionGroup title={group}>
              {data.map((option, index) => {
                if (option.group === group) {
                  return (
                    <Option
                      key={option.value}
                      option={option}
                      isMultiple={multiple}
                      parentValue={value}
                      clickOption={clickOption}
                      index={index}
                      hoverIndex={hoverOption}
                      textFilter={textFilter}
                    />
                  );
                }

                return <></>;
              })}
            </OptionGroup>
          ))}
        </>
      );
    }

    return (
      <>
        {data.map((option, index) => (
          <Option
            key={option.value}
            option={option}
            isMultiple={multiple}
            parentValue={value}
            clickOption={clickOption}
            index={index}
            hoverIndex={hoverOption}
            textFilter={textFilter}
          />
        ))}
      </>
    );
  };

  const getOptions = () => {
    return (
      <div
        style={{
          '--rs-color': color ? getColor(color) : '',
        }}
        className={classnames(
          'rs-select__options',
          {
            [`rs-component--${color}`]: color,
          },
          { 'rs-select__options__hidden': !activeOptions },
        )}
        ref={optionsRef}
        onMouseLeave={() => {
          setState({
            targetSelect: false,
            targetSelectInput: false,
          });
        }}
        onMouseEnter={() => {
          setState({
            targetSelect: true,
            targetSelectInput: true,
          });
        }}
      >
        <div className="rs-select__options__content" ref={contentRef}>
          {noData && (
            <div className="rs-select__options__content__not-data">
              {renderNoData ? renderNoData() : 'No Data available'}
            </div>
          )}
          {getOptionComponents()}
        </div>
      </div>
    );
  };

  const getChips = () => {
    return (
      <button
        ref={chipsRef}
        className="rs-select__chips"
        onKeyDown={handleKeydown}
        onFocus={(evt) => {
          if (!targetClose) {
            onFocus(evt);
          }
          if (filter && multiple) {
            getHTMLElement(chipsInputRef).focus();
          }
        }}
        onClick={() => {
          if (activeOptions && !targetClose) {
            handleBlur();
            getHTMLElement(chipsRef).blur();
          }

          if (!activeOptions) {
            setState({
              activeOptions: true,
            });
          }
        }}
        onBlur={blur}
      >
        {getChipsContent()}

        <input
          className={classnames('rs-select__chips__input', {
            'rs-select__chips__input__hidden': !filter,
          })}
          ref={chipsInputRef}
          placeholder={placeholder}
          id={name}
          value={textFilter}
          onFocus={(evt) => {
            if (!targetClose) {
              setState({
                activeOptions: true,
              });
              onFocus(evt);
            }
          }}
          onBlur={blur}
          onChange={(evt) => {
            setState({
              textFilter: evt.target.value,
            });
          }}
        />
      </button>
    );
  };

  const getPlaceholder = () => {
    return (
      <label
        ref={placeholderRef}
        htmlFor={name}
        className={classnames('rs-select__label', {
          'rs-select__label--hidden': value || textFilter,
        })}
      >
        {placeholder}
      </label>
    );
  };

  const getLabel = () => {
    return (
      <label
        htmlFor={name}
        className={classnames(
          'rs-select__label',
          {
            'rs-select__label--placeholder': labelPlaceholder,
          },
          {
            'rs-select__label--label': label,
          },
          {
            'rs-select__label--hidden': value,
          },
        )}
      >
        {labelPlaceholder || label}
      </label>
    );
  };

  const getLoading = () => {
    return <div className="rs-select__loading" />;
  };

  const getInput = () => {
    return (
      <input
        ref={inputRef}
        id={!multiple && name}
        readOnly={!filter && true ? 'readonly' : false}
        className={classnames(
          'rs-select__input',
          {
            multiple: multiple,
          },
          { simple: !multiple && !filter },
        )}
        onKeyDown={handleKeydown}
        value={activeFilter ? textFilter : getValueLabel()}
        onFocus={(evt) => {
          onFocus(evt);

          if (filter) {
            setState({
              activeFilter: true,
            });
          }
        }}
        onClick={() => {
          if (activeOptions && !filter) {
            handleBlur();
            getHTMLElement(inputRef).blur();
          }

          if (!activeOptions) {
            setState({
              activeOptions: true,
            });
          }
        }}
        onBlur={blur}
        onChange={(evt) =>
          setState({
            textFilter: evt.target.value,
          })
        }
      />
    );
  };

  const getIcon = () => {
    return (
      <IconArrow
        onClick={() => {
          if (activeOptions) {
            setState({
              activeOptions: false,
            });
          } else {
            getHTMLElement(inputRef).focus();
          }
        }}
      />
    );
  };

  const getMessage = () => {
    return (
      <div className={classnames('rs-select__message', `rs-select__message--${color}`)}>
        {message}
      </div>
    );
  };

  const getSelectContent = () => {
    return (
      <div
        ref={selectRef}
        className={classnames('rs-select', `rs-select--state-${state}`, {
          'rs-select--disabled': disabled,
          activeOptions: activeOptions,
          loading: loading,
        })}
        onMouseLeave={(evt) => {
          if (evt.relatedTarget !== getHTMLElement(optionsRef)) {
            setState({
              targetSelectInput: false,
              targetSelect: false,
            });
          }
        }}
        onMouseEnter={() => {
          setState({
            targetSelectInput: true,
          });
        }}
      >
        {getInput()}
        {(!multiple || label) && getLabel()}
        {getPlaceholder()}
        {multiple && getChips()}
        {getOptions()}
        {loading && getLoading()}
        {getIcon()}
      </div>
    );
  };

  return (
    <div
      style={{
        '--rs-color': state ? getColor(state) : '',
      }}
      className={classnames(
        'rs-select-content',
        {
          [`rs-component--${state}`]: state,
        },
        { block: block },
      )}
    >
      {getSelectContent()}
      {getMessage()}
    </div>
  );
}

Select.defaultProps = {
  onFocus: () => {},
  onBlur: () => {},
  onChange: () => {},
};

export default Select;
