


import React, { useRef } from 'react';
import { useHistory } from "react-router-dom";
import classnames from 'classnames';

import IconArrow from '../../../icons/arrow';

import './item.scss';

function Item(props) {

  const { to, id, href, target='_blank', arrow, children, icon, } = props;
  const history = useHistory();
  const currentRef = useRef(null);
  
  const handleClick = () => {
    if (to) {
      history.push(to)
    } else if (href) {
      window.open(href, target)
    }
  }


  const getIcon = () => {
    return <div className="rs-sidebar__item__icon" >{icon}</div>
  }

  const getTextTooltip = () => {
    return <div className="rs-sidebar__item__text-tooltip">{children}</div>
  }

  const getText = () => {
    return <div className="rs-sidebar__item__text">{children}</div>
  }

  const iconArrow = () => {
    return <IconArrow />
  }

  const getArrow = () => {
    return <div className="rs-sidebar__item__arrow">{ arrow || iconArrow() } </div>
  }

  return (
    <button 
        ref={currentRef}
        className={classnames(
            'rs-sidebar__item',
            // { active: (currentRef.current.parent).getValue && id === (currentRef.current.parent).getValue },
            { hasIcon: icon },
        )}
        onClick={() => {
          if (id) {
            (currentRef.current.parent).handleClickItem(id)
          }
          handleClick()
        }}
    >
        { icon && getIcon() }
        { getText() }
        { getTextTooltip() }
        { getArrow() }
    </button>
  );
}

export default Item;