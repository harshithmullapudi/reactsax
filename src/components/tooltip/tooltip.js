import React, { useRef, useEffect, useState } from 'react';
import classnames from 'classnames';
import t from 'prop-types';

import getColor, { insertBody, setCordsPosition } from '../../util/index';
import { getHTMLElement } from '../../util/dom_utils';

import './tooltip.scss';

function Tooltip(props) {
  const {
    visible,
    color,

    // position
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
    interactivity,
    children,
  } = props;

  const [activeTooltip, setActiveTooltip] = useState(false);
  const [isHoverTooltip, setIsHoverTooltip] = useState(false);

  const tooltipRef = useRef(null);
  const tooltipContentRef = useRef(null);

  // console.log(tooltipRef);

  const getLoading = () => {
    return <div className="rs-tooltip__loading" />;
  };

  const handlerMouseEnter = () => {
    if (delay) {
      setTimeout(() => {
        setActiveTooltip(true);
      }, Number(delay));
    } else {
      setActiveTooltip(true);
    }
  };

  const insertTooltip = () => {
    insertBody(getHTMLElement(tooltipRef), document.body);

    let position = 'top';
    if (bottom) {
      position = 'bottom';
    } else if (left) {
      position = 'left';
    } else if (right) {
      position = 'right';
    }

    setCordsPosition(getHTMLElement(tooltipRef), getHTMLElement(tooltipContentRef), position);
  };

  const removeTooltip = () => {
    // tooltipRef.current.remove();
    setActiveTooltip(false);
    // this.$emit('input', false)
  };

  const handleResize = () => {
    let position = 'top';
    if (bottom) {
      position = 'bottom';
    } else if (left) {
      position = 'left';
    } else if (right) {
      position = 'right';
    }
    if (!tooltip) {
      return;
    }
    setCordsPosition(getHTMLElement(tooltipRef), getHTMLElement(tooltipContentRef), position);

    for (let index = 0; index < 300; index++) {
      setTimeout(() => {
        setCordsPosition(getHTMLElement(tooltipRef), getHTMLElement(tooltipContentRef), position);
      }, index);
    }
  };

  const handleMouseDownNotHover = (evt) => {
    if (!evt.target.closest('.rs-tooltip') && !evt.target.closest('.rs-tooltip-content')) {
      removeTooltip();
    }
  };

  useEffect(() => {
    if (activeTooltip) {
      insertTooltip();
    }
  }, [activeTooltip]);

  useEffect(() => {
    setActiveTooltip(visible);
    if (visible) {
      insertTooltip();
    }
  }, [visible]);

  useEffect(() => {
    // window.addEventListener('popstate', (event) => {
    //   const tooltips = document.querySelectorAll('.rs-tooltip');
    //   tooltips.forEach((tooltip) => {
    //     tooltip.remove();
    //   });
    // });

    window.addEventListener('resize', handleResize);

    if (notHover) {
      window.addEventListener('mousedown', handleMouseDownNotHover);
    }

    window.addEventListener('touchstart', handleMouseDownNotHover);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousedown', handleMouseDownNotHover);
    };
  }, []);

  const getTooltip = () => {
    const onMouseEnter = () => {
      if (interactivity) {
        setIsHoverTooltip(true);
        handlerMouseEnter();
      }
    };

    const onMouseLeave = () => {
      setIsHoverTooltip(false);
      removeTooltip();
    };

    return (
      <div
        style={{
          '--rs-color': color ? getColor(color) : '',
        }}
        ref={tooltipRef}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={classnames(
          { 'rs-tooltip': activeTooltip },
          { 'rs-tooltip-inactive': !activeTooltip },
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
          { [`rs-component--${color}`]: color },
        )}
      >
        {tooltip}
        {loading && getLoading()}
      </div>
    );
  };

  return (
    <div
      ref={tooltipContentRef}
      className="rs-tooltip-content"
      onMouseEnter={() => {
        if (!notHover) {
          handlerMouseEnter();
        }
      }}
      onMouseLeave={() => {
        if (!notHover) {
          if (interactivity) {
            setTimeout(() => {
              if (!isHoverTooltip) {
                removeTooltip();
              }
            }, 250);
          } else {
            removeTooltip();
          }
        }
      }}
    >
      {children}
      {getTooltip()}
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
  interactivity: t.bool,
};

export default Tooltip;
