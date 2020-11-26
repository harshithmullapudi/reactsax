import React from 'react';
import t from 'prop-types';
import classnames from 'classnames';
import './styles.scss';

function Col(props) {
  const {
    children,
    w,
    offset,
    order,
    lg,
    sm,
    xs,
    type,
    justify,
    background
  } = props;

  return (
    <div
      style={{
        justifyContent: justify,
        display: type,
        order: order,
        background: background
      }}
      className={classnames(
        'rs-col',
        { [`rs-col--w-${w}`]: w },
        { [`rs-col--offset-${offset}`]: offset},
        { [`rs-col--lg-${lg}`]: lg },
        { [`rs-col--sm-${sm}`]: sm },
        { [`rs-col--sm-${xs}`]: xs },
      )}
    >
     { children }
    </div>
  );
}

Col.propTypes = {
  w: t.string,
  order: t.string,
  offset: t.string,
  lg: t.string,
  sm: t.number,
  xs: t.string,
  type: t.string,
  justify: t.string
};

export default Col;
