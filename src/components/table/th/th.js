import React from 'react';
import classnames from 'classnames';

import IconClose from '../../icons/close';
import IconPlus from '../../icons/plus';

import './th.scss';

function Th (props) {
  const { 
    sort
   } = props;


   const getIcon = () => {
    return <IconPlus hover="+" />
   }

  const getIcon2 = () => {
    return <IconClose hover="x" />;
  }

   const getIcons = () => {
     return <div className="rs-table__th__content__icons">
       {getIcon()}
       {getIcon2()}
     </div>
   }

   const getContent = () => {
     return <div className="rs-table__th__content">
       {sort}
       {getIcons()}
     </div>
   }

   return (
    <div
      className={classnames(
        'rs-table__th',
        { sort: sort },
      )}
    >
      {getContent()}
    </div>
  );
}


export default Th;
