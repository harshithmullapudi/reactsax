import React from 'react';

import './navbar_group.scss';

function Group(props) {
  const { children } = props;

  const setModel = (id) => {
    const parent = this.$parent
    parent.setModel(id)
  }

  const setLeftLine = () => {
    const parent = this.$parent
    const left = (this.$el).offsetLeft
    parent.setLeftLine(left)
    const width = (this.$refs.item).scrollWidth
    parent.setWidthLine(width)
  }

  const setWidthLine = () => {}

  const item = () => {
    return <button className="rs-navbar__group__item" ref="item">{children}</button>
  }

  const items = () => {
    return <div className="rs-navbar__group__items">{children}</div>
  }

  return (
    <div className="rs-navbar__group">
        {item}
        {items}
    </div>
  );
}

export default Group;
