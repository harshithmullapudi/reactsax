import React, { useRef, useEffect, useState } from 'react';
import classnames from 'classnames';
import t from 'prop-types';

import './navbar.scss';

function Navbar(props) {
    const {
        children,
        fixed,
        color,
        isColor,
        shadow,
        shadowScroll,
        hideScroll,
        textWhite,
        square,
        paddingScroll,
        notLine,
        leftCollapsed,
        centerCollapsed,
        rightCollapsed,
        targetScroll,
        // slots
        leftSlot,
        rightSlot
    } = props;

    console.log('left', leftSlot, rightSlot)

    const [leftLine, setLeftLineState] = useState(0)
    const [widthLine, setWidthLineState] = useState(0)
    const [varScrollTop, setVarScrollTop] = useState(0)
    const [collapsedWidth, setCollapsedWidth] = useState(0)
    const [hidden, setHidden] = useState(false)
    const [shadowActive, setShadowActive] = useState(false)
    const [paddingScrollActive, setPaddingScrollActive] = useState(false)
    const [lineNotTransition, setLineNotTransition] = useState(false)
    const [collapsedForced, setCollapsedForced] = useState(false)

    const leftChild = useRef(null);
    const centerChild = useRef(null);
    const rightChild = useRef(null);
    const currentRef = useRef(null);


    useEffect(() => {
        setTimeout(() => {
            const left = leftChild
            const center = centerChild
            const right = rightChild
            setCollapsedWidth(left.offsetWidth + center.offsetWidth + right.offsetWidth + 150);
            const navbar = currentRef
            if (navbar.offsetWidth < collapsedWidth) {
              setCollapsedForced (true);
              this.$emit('collapsed', true)
              setWidthLine(0);
              handleResize()
            }
          }, 150)
      
          handleScroll()
          window.addEventListener('resize', handleResize)
    })
    const setLeftLine = (left, transition = true) => {
        if (!transition) {
            setLineNotTransition(true)
        } else {
            setLineNotTransition(false)
        }
        setLeftLineState(left);
    }

    const setWidthLine = (width) => {
        setWidthLineState(width);
    }

    const scroll = (evt) => {
        const scrollTop = targetScroll ? document.querySelector(targetScroll).scrollTop : window.pageYOffset
        if (hideScroll) {
            setHidden(Math.sign(scrollTop - varScrollTop) === 1)
        }

        if (shadowScroll) {
            setShadowActive(scrollTop > 0)
        }

        if (paddingScroll) {
            setPaddingScrollActive(scrollTop > 0);
        }

        setVarScrollTop(scrollTop);
    }

    const handleScroll = () => {
        if (hideScroll || shadowScroll || paddingScroll) {
            if (targetScroll) {
                const scrollElement = document.querySelector(targetScroll)
                scrollElement.addEventListener('scroll', scroll)
            } else {
                window.addEventListener('scroll', scroll)
            }
        }
    }

    const handleResize = () => {
        const active = currentRef.querySelector('.vs-navbar__item.active')
        if (active) {
            setLeftLine(active.offsetLeft, false)
        } else {
            setWidthLineState(0);
        }
        const navbar = currentRef

        if (leftCollapsed || centerCollapsed || rightCollapsed) {
            if (navbar.offsetWidth < collapsedWidth) {
                setCollapsedForced(true);
            }
        }

        if (collapsedForced) {
            this.$emit('collapsed', true)
        } else {
            this.$emit('collapsed', false)
        }

        if (navbar.offsetWidth < collapsedWidth) {
            this.$emit('collapsed', true)
        } else {
            this.$emit('collapsed', false)
            setCollapsedForced(false);
        }
    }

// templates

    const left = () => {
        return <div className="rs-navbar__left" ref={leftChild}>{leftSlot}</div>
    }

    const center = () => {
        return <div className="rs-navbar__center">{children}</div>
    }

    const right = () => {
        return <div className="rs-navbar__right" ref={rightChild}>{rightSlot}</div>
    }

    const line = () => {
        return (
            <div
                className={classnames(
                    'rs-navbar__line',
                    { 'notTransition': lineNotTransition },
                )}
                style={{
    left: `${leftLine}px`,
    width: `${widthLine}px`
  }}
            />
        )
    }

    const navbar = () => {
        return (
            <div className="rs-navbar">
                {(leftCollapsed ? !collapsedForced : true) && left()}
                {(centerCollapsed ? !collapsedForced : true) && center()}
                {(rightCollapsed ? !collapsedForced : true) && right()}
            </div>
        )
    }

    return (
        <div
            ref={currentRef}
            style={{
    '--rs-color': color,
  }}
            className={classnames(
                'rs-navbar-content',
                { fixed: fixed },
                { shadow: shadow },
                { hidden: hidden },
                { shadowActive: shadowActive },
                { textWhite: textWhite },
                { paddingScroll: paddingScroll },
                { paddingScrollActive: paddingScrollActive },
                { rsNavbarSquare: square },
                {
                    [`rs-component--${color}`]: color,
                },
                { [`rs-component--is-color`]: isColor },
            )}
        >
            {navbar()}
            {!notLine && line()}
        </div>
    );
}

// Add generic input listerners
Navbar.propTypes = {
    fixed: t.bool,
    shadow: t.bool,
    shadowScroll: t.bool,
    hideScroll: t.bool,
    textWhite: t.bool,
    square: t.bool,
    paddingScroll: t.bool,
    notLine: t.bool,
    leftCollapsed: t.bool,
    centerCollapsed: t.bool,
    rightCollapsed: t.bool,
    targetScroll: t.any
};

Navbar.defaultProps = {
    color: 'primary'
};

export default Navbar;
