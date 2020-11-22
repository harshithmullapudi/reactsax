import React, { useRef, useEffect } from 'react';
import classnames from 'classnames';

import t from 'prop-types';

import getColor, { insertBody, setCordsPosition } from '../../util/index'
import './tooltip.scss';

function Tooltip(props) {
  const {
    value,
    color,
    bottom,
    left,
    right,
    shadow,
    notArrow,
    square,
    circle,
    border,
    borderThick,
    delay,
    loading,
    tooltip,
    notHover,
    interactivity
  } = props;

  var activeTooltip = false;
  var isHoverTooltip = false;
  const tooltipRef = useRef(null);
  const tooltipcontentRef = useRef(null);


  useEffect(() => {
    activeTooltip = value;
    if (value) {
      this.insertTooltip()
    }
  }, [value])

  useEffect(() => {
    window.addEventListener('popstate', (event) => {
      const tooltips = document.querySelectorAll('.rs-tooltip')
      tooltips.forEach((tooltip) => {
        tooltip.remove()
      })
    })

    window.addEventListener('resize', handleResize)

    if (notHover) {
      window.addEventListener('mousedown', handleMouseDownNotHover)
    }

    window.addEventListener('touchstart', handleMouseDownNotHover)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousedown', handleMouseDownNotHover)
    };

  });

  const getLoading = () => {
    return <div className="rs-tooltip__loading" />
  }

  const handlerMouseEnter = () => {
    if (delay) {
      setTimeout(() => {
        activeTooltip = true
        insertTooltip()
      }, Number(delay))
    } else {
      activeTooltip =
        setTimeout(function () {
          console.log("TIMEOUT 3");
          insertTooltip()
        }, 2000);

    }
  }

  const insertTooltip = () => {

    insertBody(tooltipRef, document.body)

    let position = 'top'
    if (bottom) {
      position = 'bottom'
    } else if (left) {
      position = 'left'
    } else if (right) {
      position = 'right'
    }

    setCordsPosition(tooltipRef, tooltipcontentRef, position)
  }

  const removeTooltip = () => {
    activeTooltip = false
    // this.$emit('input', false)
  }

  const handleResize = () => {
    let position = 'top'
    if (bottom) {
      position = 'bottom'
    } else if (left) {
      position = 'left'
    } else if (right) {
      position = 'right'
    }
    if (!tooltip) { return }
    setCordsPosition(tooltipRef, tooltipcontentRef, position)

    for (let index = 0; index < 300; index++) {
      setTimeout(() => {
        setCordsPosition(tooltipRef, tooltipcontentRef, position)
      }, index);
    }
  }

  const handleMouseDownNotHover = (evt) => {
    if (!evt.target.closest('.rs-tooltip') && !evt.target.closest('.rs-tooltip-content')) {
      removeTooltip()
    }
  }

  const getTooltip = () => {

    const onMouseEnter = () => {
      if (interactivity) {
        isHoverTooltip = true
        handlerMouseEnter()
      }
    }

    const onMouseLeave = () => {
      isHoverTooltip = false
      removeTooltip()
    }

    return <div
      ref={tooltipRef}
      // style={{
      //   '--rs-color': color ? getColor(color) : '',
      // }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={classnames(
        'rs-tooltip',
        { top: !bottom && !left && !right },
        { bottom: bottom },
        { left: left },
        { right: right },
        { shadow: shadow },
        { notArrow: notArrow },
        { square: square },
        { circle: circle },
        { border: border },
        { borderThick: borderThick },
        { loading: loading },
        // colors
        `rs-component--${color}`,
      )}
    >
      {/* { tooltip } */}
      {loading && getLoading()}
    </div>
  }

  return (
    <div
      ref={tooltipcontentRef}
      className="rs-tooltip-content"
      onMouseEnter={() => {
        if (!notHover) {
          handlerMouseEnter()
        }
      }}
      onMouseLeave={() => {
        if (!notHover) {
          if (interactivity) {
            setTimeout(() => {
              if (!isHoverTooltip) {
                removeTooltip()
              }
            }, 250)
          } else {
            removeTooltip()
          }
        }
      }}
    >
      <div name="rs-tooltip">
        hello
        {getTooltip()}
        {/* { activeTooltip && getTooltip() } */}
      </div>
    </div>
  );
}

Tooltip.propTypes = {
  color: t.oneOf(['primary', 'success', 'danger', 'warn', 'dark', 'warn']),
  bottom: t.bool,
  left: t.bool,
  right: t.bool,
  shadow: t.bool,
  notArrow: t.bool,
  square: t.bool,
  circle: t.bool,
  border: t.bool,
  borderThick: t.bool,
  delay: t.number,
  loading: t.bool,
  tooltip: t.element,
  notHover: t.bool,
  interactivity: t.bool
};

export default Tooltip;
