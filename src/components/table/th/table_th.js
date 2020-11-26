import React from 'react';
import classnames from 'classnames';
import IconArrow from '../../icons/arrow';

import './table_th.scss';

function TableTh(props) {
  const {
    children,
    sort
  } = props;

  // mounted() {
  //   (this.$el as HTMLElement).style.width = `${this.$el.scrollWidth}px`
  // }

  const renderIcon2 = () => {
    return <IconArrow className="icon-sort-2" />
  }
  const renderIcon = () => {
    return <IconArrow className="icon-sort-1" />
  }

  const renderIcons = () => {
    return <div className="rs-table__th__content__icons">
      {renderIcon}
      {renderIcon2}
    </div>
  }

  const renderContent = () => {
    return (
      <div className="rs-table__th__content">
        {children}
        { sort && renderIcons() }
    </div>
    )
  }

  return (
    <th
      className={classnames(
        's-table__th',
        { 'sort': sort },
      )}
    >
      {renderContent()}
    </th>
  );
}

export default TableTh;