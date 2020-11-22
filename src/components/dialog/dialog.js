import React from 'react';
import { createPortal } from 'react-dom';

import classnames from 'classnames';

import IconClose from '../../icons/close';

import './dialog.scss';

function Dialog(props) {
  const {
    visible,
    fullScreen,
    rebound,
    notPadding,
    square,
    autoWidth,
    scroll,
    loading,
    notCenter,
    width,
    header,
    footer,
    onClose,
    notClose,
    blur,
  } = props;

  // const esc = (evt) => {
  //   if (evt.which == 27 && !this.preventClose) {
  //     this.$emit('input', false)
  //     this.$emit('close')
  //   }
  // };

  // const addEsc = () => {
  //   window.addEventListener('keydown', esc);
  // };

  const getLoading = () => {
    return (
      <div className="rs-dialog__loading">
        <div className="rs-dialog__loading__load"></div>
      </div>
    );
  };

  const getHeader = () => {
    return <div className="rs-dialog__header">{header}</div>;
  };

  const getClose = () => {
    return (
      <button className="rs-dialog__close" onClick={onClose}>
        <IconClose hover="x" />
      </button>
    );
  };

  const getContent = () => {
    return <div className={classnames('rs-dialog__content', { [`notFooter`]: !footer })}></div>;
  };

  const getFooter = () => {
    return <div className="rs-dialog__footer">{footer}</div>;
  };

  const dialog = () => {
    return (
      <div
        style={{
          width: width,
        }}
        className={classnames(
          'rs-dialog',
          { [`rs-dialog--fullScreen`]: fullScreen },
          { [`rs-dialog--rebound`]: rebound },
          { [`rs-dialog--notPadding`]: notPadding },
          { [`rs-dialog--square`]: square },
          { [`rs-dialog--autoWidth`]: autoWidth },
          { [`rs-dialog--scroll`]: scroll },
          { [`rs-dialog--loading`]: loading },
          { [`rs-dialog--notCenter`]: notCenter },
        )}
      >
        {loading && getLoading()}
        {!notClose && getClose()}
        {header && getHeader()}
        {getContent()}
        {footer && getFooter()}
      </div>
    );
  };

  const getDialogContent = () => {
    return (
      <div
        className={classnames(
          'rs-dialog-content',
          { [`fullScreen`]: fullScreen },
          { [`blur`]: blur },
        )}
        onClick={onClose}
      >
        {dialog()}
      </div>
    );
  };

  return <>{createPortal(visible && getDialogContent(), document.body)}</>;
}

export default Dialog;
