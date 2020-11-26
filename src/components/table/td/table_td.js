import React from 'react';
import classnames from 'classnames';

import './table_td.scss';

function TableTd(props) {
  const {
    children,
    checkbox,
    edit
  } = props;

  return (
    <td 
      className={classnames(
        'rs-table__td',
        { 'isCheckbox': checkbox },
        { 'isEdit': edit }
      )}
    >
      {children}
    </td>
  );
}

export default TableTd;
