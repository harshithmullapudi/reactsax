import React, { useRef, useEffect, useState } from 'react';
import classnames from 'classnames';
import t from 'prop-types';

import './sidebar.scss';
import { setColor } from '../../../util/index'

function Sidebar(props) {
    const {
        value,
        reduce,
        hoverExpand,
        open,
        notLineActive,
        square,
        textWhite,
        notShadow,
        relative,
        absolute,
        right,
        background,
        color,
        isColor,
        // templates
        headerSlot,
        footerSlot,
        logoSlot,
        children
    } = props;
  
    const [staticWidth, setStaticWidth] = useState(260)
    const [forceExpand, setForceExpand] = useState(false)
    const [reduceInternal, setReduceInternal] = useState(false)

    const currentRef = useRef(null);
    
    useEffect(() => {
        setStaticWidth(currentRef.current.offsetWidth)
        setReduceInternal(reduce)

        if (background !== 'background') {
            setColor('background', background, currentRef.current, true)
        }

        if (textWhite) {
            setColor('text', '#fff', currentRef.current, true)
        }
    })
    
// templates

const getLogo = () => {
    return (
        <div className="rs-sidebar__logo">
            {logoSlot}
        </div>
    )
}

  const getHeader = () => {
      return (
          <div className="rs-sidebar__header">
              {headerSlot}
          </div>
      )
  }

  const getFooter = () => {
    return (
        <div className="rs-sidebar__footer">
            {footerSlot}
        </div>
    )    
}

  const getSidebar = () => {
    return (
        <div className="rs-sidebar">
            {children}
        </div>
    )      
}
const setInternal = (val) => {
    if(hoverExpand) {
        setReduceInternal(val);
    }
} 
    return (
        <div
            ref={currentRef}
            style={{
    '--rs-color': color,
  }}
            mouseenter={setInternal}
            mouseleave={setInternal}
            className={classnames(
                'rs-navbar-content',
                { reduce: reduceInternal },
                { open: open },
                { notLineActive: notLineActive },
                { square: square },
                { notShadow: notShadow },
                { textWhite: textWhite },
                { relative: relative },
                { absolute: absolute },
                { right: right },
                {
                    [`rs-component--${color}`]: color,
                },
                { [`rs-component--is-color`]: isColor },
            )}
        >
            {logoSlot && getLogo()}
            {headerSlot && getHeader()}
            {getSidebar()}
            {footerSlot && getFooter()}
        </div>
    );
}

// Add generic input listerners
Sidebar.propTypes = {
    hoverExpand: t.bool,
    reduce: t.bool,
    open: t.bool,
    notLineActive: t.bool,
    textWhite: t.bool,
    square: t.bool,
    notShadow: t.bool,
    relative: t.bool,
    absolute: t.bool,
    right: t.bool,
    background: t.string,
    value: t.any
};

Sidebar.defaultProps = {
    color: 'primary'
};

export default Sidebar;
