import React, { useState, useRef } from 'react';
import classnames from 'classnames';
import t from 'prop-types';

import IconClose from '../../icons/close';
import IconPlus from '../../icons/plus';

import getColor from '../../util/index';
import { loadAfterMount } from '../../util/dom_utils';

import './alert.scss';

function Alert(props) {
  const {
    color,
    type,
    closable,
    hiddenContent,
    progress,
    page = 0,
    Pages,
    Icon,
    Footer,
    Title,
    children,
    onClose,
  } = props;

  const [pageState, setPageState] = useState(page);
  const [hiddenState, setHiddenState] = useState(hiddenContent);

  const elRef = useRef(null);
  const contentRef = useRef(null);

  const handleClickPrevPage = () => {
    if (pageState > -1) {
      setPageState(pageState - 1);
    }
  };

  const handleClickNextPage = () => {
    if (pageState < Pages.length - 1) {
      setPageState(pageState + 1);
    }
  };

  const handleHiddenContent = (val) => {
    setHiddenState(!hiddenState);
    // if (!this.value) {
    //   return
    // }
    // const el =
    // const content = (this.$refs.content as HTMLElement)
    // if (!val) {
    //   el.style.height = 'auto'
    //   setTimeout(() => {
    //     el.style.height = this.$el.scrollHeight - 1 + 'px'
    //   }, 250)
    // } else {
    //   el.style.height = this.$el.scrollHeight - content.scrollHeight + 'px'
    // }
  };

  const getCurrentPage = () => {
    return pageState < Pages.length ? <>{Pages[pageState]}</> : children;
  };

  const contentText = () => {
    return <div className="rs-alert__content__text">{Pages ? getCurrentPage() : children}</div>;
  };

  const content = () => {
    if (!hiddenState) {
      return (
        <div className="rs-alert__content" ref={contentRef}>
          {contentText()}
        </div>
      );
    }
  };

  const getTitle = () => {
    return (
      <div
        className={classnames('rs-alert__title', {
          'rs-alert__title--clickHidden': typeof hiddenContent === 'boolean',
        })}
      >
        {Title}
        {!closable && typeof hiddenContent === 'boolean' && (
          <IconPlus less={!hiddenState} onClick={handleHiddenContent} />
        )}
      </div>
    );
  };

  const getFooter = () => {
    return <div className="rs-alert__footer">{Footer}</div>;
  };

  const closeBtn = () => {
    return (
      <button className="rs-alert__close" onClick={onClose}>
        <IconClose hover="less" />
      </button>
    );
  };

  const getProgress = () => {
    return (
      <div className="rs-alert__progress">
        <div
          className="rs-alert__progress__bar"
          style={{
            width: progress,
          }}
        />
      </div>
    );
  };

  const getPagination = () => {
    return (
      <div className="rs-alert__pagination">
        <button onClick={handleClickPrevPage}>{'<'}</button>
        <span>
          {pageState + 1} / {Pages.length}
        </span>
        <button onClick={handleClickNextPage}>{'>'}</button>
      </div>
    );
  };

  return (
    <div
      ref={elRef}
      className={classnames(
        'rs-alert',
        { [`rs-alert--${type}`]: type },
        { [`rs-alert--pages`]: Pages && Pages > 0 },
        // colors
        {
          [`rs-component--${color}`]: color,
        },
      )}
      style={{
        '--rs-color': color ? getColor(color) : '',
      }}
    >
      {Icon && <div className="rs-alert__icon">{Icon}</div>}
      {Title && getTitle()}
      {content()}
      {closable && closeBtn()}
      {Footer && getFooter()}
      {!!progress && getProgress()}
      {Pages && Pages.length > 1 && getPagination()}
    </div>
  );
}

Alert.propTypes = {
  color: t.oneOf(['primary', 'secondary', 'success', 'danger', 'warn', 'dark', 'light', 'warn']),
  visible: t.bool,
  type: t.oneOf(['solid', 'border', 'shadow', 'gradient', 'relief']),
  hiddenContent: t.bool,
  page: t.number,
  progress: t.number,
  closable: t.bool,
  Title: t.element,
  Icon: t.element,
  Pages: t.arrayOf(t.element),
  Footer: t.element,
};

Alert.defaultProps = {
  color: 'primary',
  visible: false,
};

export default loadAfterMount(Alert);
