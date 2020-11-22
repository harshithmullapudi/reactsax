import React from 'react';
import classnames from 'classnames';

import './td.scss';

function Td (props) {
  const { 
    checkbox,
    edit,
    click
   } = props;

   return (
    <div
      className={classnames(
        'rs-table__td',
        { isCheckbox: checkbox },
        { isEdit: edit },
      )}
      onclick={click}
    >
    </div>
  );
}


export default Td;
