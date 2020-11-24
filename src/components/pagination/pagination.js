import React, { useRef, useEffect, useState } from 'react';
import classnames from 'classnames';

import t from 'prop-types';

import IconArrow from '../../icons/arrow';

import getColor from '../../util/index';

import './pagination.scss';

function Pagination(props) {
  const { 
    children,
    length = 0, 
    color, 
    arrowNext, 
    max = 9, 
    arrowPrev, 
    disabled, 
    setValuePage, 
    notArrows = false, 
    onlyArrows, 
    circle, 
    square, 
    buttonsDotted, 
    disabledItems=[], 
    loadingItems = [], 
    notMargin, 
    progress, 
    dottedNumber, 
    infinite, 
    value 
  } = props;

  const [ leftActive, setLeftActive ] = useState(42);
  const [ activeClassMove, setActiveClassMove ] = useState(false);
  const [ val, setVal ] = useState(0);

  const paginationRef = useRef(null);

  // useEffect(() => {
  //   setVal(value + 1);
  //   handleValue(value, val)
  // })

  useEffect(() => {
    console.log('length changed', length);
    const offsetLeftPagination = (paginationRef).offsetLeft
    // setLeftActive((this.$refs[`btn${value}`]).offsetLeft + offsetLeftPagination)
    setTimeout(() => {
      setActiveClassMove(false);
    }, 300);
  }, [length])

  useEffect(() => {
    handleValue();
  })

  const handleValue = (val, prevValue) => {
    if (isDisabledItem(val) || isLoadingItem(val)) {
      let newVal = val
      if (val > prevValue) {
        newVal += 1
      } else {
        newVal -= 1
      }

      if (newVal > length) {
        newVal = infinite ? 1 : prevValue
      } else if (newVal <= 0) {
        newVal = infinite ? length : prevValue
      }
      setVal(newVal)
      setValuePage(newVal)
    } else {
      setVal(val)
      if (paginationRef) {
        setActiveClassMove(true);
          const offsetLeftPagination = paginationRef.offsetLeft
          // setLeftActive((this.$refs[`btn${val}`]).offsetLeft + offsetLeftPagination);
          setTimeout(() => {
            setActiveClassMove(false)
          }, 300)
      }
    }
  }

  const renderDotted = (text = '...') => {
    const dotted = () => {
      const handleClick = (evt) => {
        let newVal = (value === length ? false : text === '...>') ? setVal(val + dottedNumber) : setVal(val-dottedNumber);
        if (newVal > length) {
          newVal = length
        } else if (newVal < 1) {
          newVal = 1
        }
        setValuePage(newVal);
      }

      return (
        <div
          onClick={handleClick}
          className={classnames(
            'rs-pagination__dotted',
            { next: value === length ? false : text === '...>' },
          )}
        >
          <span className="dotted" >...</span>
          <span className="con-arrows" >
            <IconArrow />
            <IconArrow />
          </span>
        </div>
      )
    }
    return (
      <>
        { dotted()}
      </>
    )
  }

  const isDisabledItem = (item) => {
    return disabledItems.indexOf(item) !== -1
  }

  const isLoadingItem = (item) => {
    return loadingItems.indexOf(item) !== -1
  }

  const renderButton = (NumberPage = 1) => {
    return (
      <button
        className={classnames(
          'rs-pagination__button',
          { active: NumberPage === value },
          { prevActive: NumberPage === value - 1 },
          { nextActive: NumberPage === value + 1 },
          { disabled: isDisabledItem(NumberPage) },
          { loading: isLoadingItem(NumberPage) }
        )}
        // ref ={`btn${NumberPage}`}
        onClick={
          (evt) => {
            setValuePage(NumberPage)
          }
        }
      >
        { buttonsDotted ? '' : `${NumberPage}`}
      </button>
    )
  }

  const renderButtons = (array) => {
    const buttons = []
    array.forEach(item => {
      if (item === '...>' || item === '<...') {
        buttons.push(renderDotted(item))
      } else {
        buttons.push(renderButton(item))
      }
    });

    return buttons;
  }

  const getButtons = (start = 1, end = 6) => {
    const buttons = []
    for (start > 0 ? start : 1; start <= end; start++) {
      buttons.push(start)
    }

    return buttons
  }

  const isMobile = () => {
    return window && window.innerWidth < 600;
  }

  const getPages = ({ len, maxLength }) => {
    const length = Number(len)
    const max = isMobile ? 5 : maxLength
    const even = max % 2 === 0 ? 1 : 0
    const prevRange = Math.floor(max / 2)
    const nextRange = length - prevRange + 1 + even

    if (value >= prevRange && value <= nextRange && !buttonsDotted) {
      const start = value - prevRange + 2
      const end = value + prevRange - 2 - even

      return renderButtons([1, '<...', ...getButtons(start, end), '...>', length])
    } else if (!buttonsDotted && length > 6) {
      return renderButtons([ ...getButtons(1, prevRange), '...>', ...getButtons(nextRange, length)])
    } else if (buttonsDotted || length <= 6) {
      return renderButtons([...getButtons(1, length === 0 ? 1 : length)])
    }
    return []
  }

  const getProgress = () => {
    let percent = 0

    percent = value * 100 / length

    return percent;
  }



  // main components

  const active = () => {
    return (
      <div
        style={{
          left: `${leftActive}px`,
        }}
        className={classnames(
          'rs-pagination__active',
          { move: activeClassMove },
        )}
      >
        { buttonsDotted ? '' : value}
      </div>
    )
  }

  const getPagination = () => {
    return (
      <div
        className="rs-pagination"
        ref={paginationRef}
      >
        { getPages({ len: length, maxLength: max })}
      </div>
    )
  }

  const prev = () => {
    return (
      <button
        className="rs-pagination__arrow prev"
        disabled={infinite ? false : val <= 1}
        onClick={() => {
          const newVal = setVal(val-1)
          if (newVal > 0) {
            setValuePage(newVal)
          } else if (infinite) {
            setValuePage(length)
          }
        }}
      >
        { arrowPrev ? arrowPrev : <IconArrow />}
      </button>
    )
  }


  const next = () => {
    return (
      <button
        className="rs-pagination__arrow next"
        disabled={infinite ? false : val >= length}
        onClick={() => {
          const newVal = setVal(val + 1)
          if (newVal <= length) {
            setValuePage(newVal)
          } else if (infinite) {
            setValuePage(1)
          }
        }}
      >
        { arrowNext ? arrowNext : <IconArrow />}
      </button>
    )
  }

  const slot = () => {
    return (
      <div className="rs-pagination__slot">
        { children}
      </div>
    )
  }


  const progressBar = () => {
    return (
      <div
        className="rs-pagination__progress"
        style={{
          width: `${getProgress}%`
        }}
      />
    )
  }

  // return 
  return (
    <div
      style={{
        '--rs-color': color ? getcolor(color) : '',
      }}
      className={classnames(
        'rs-pagination-content',
        { buttonsDotted: buttonsDotted },
        { circle: circle },
        { square: square },
        { disabled: disabled },
        { notMargin: notMargin },

        // colors
        `rs-component--${color}`,
      )}
    >
      { (!onlyArrows && !children) && active()}
      { !notArrows && prev()}
      {  children && slot()}
      { (!onlyArrows && !children) && getPagination()}
      { !notArrows && next()}
      { progress && progressBar()}
    </div>
  );
}

Pagination.propTypes = {
  color: t.oneOf(['primary', 'success', 'danger', 'warn', 'dark', 'warn']),
  disabled: t.bool,
  value: t.string,
  labelBefore: t.bool,
  Icon: t.elementType,
  infinite: t.bool,
  buttonsDotted: t.bool,
  disabledItems: t.bool,
  loadingItems: t.bool,
  notMargin: t.bool,
  progress: t.bool,
  onlyArrows: t.bool,
  notArrows: t.bool,
  circle: t.bool,
  square: t.bool,
  length: t.number,
  dottedNumber: t.number,
};


Pagination.useDefaultProps = {
  color: 'primary',
  length: 0,
  max: 9,
  dottedNumber: 5
};

export default Pagination;
