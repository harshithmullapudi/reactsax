import React from 'react';
import classnames from 'classnames';

import t from 'prop-types';
import { createPortal } from 'react-dom';

import './loading.scss';

function Loading(props) {
  const {
    text,
    type,
    color,
    background,
    opacity,
    percent,
    progress,
    scale,
    target,
    isVisible
  } = props;


//   useEffect(() => {
//     setColor('color', color)
//     setColor('background', background)
//     if(opacity) {
//         setVar('opacity', opacity)
//     }
//   }, [isVisible])

  const getAnimation = () => {
    return (
        <div className="rs-loading__load__animation">
            <div className="rs-loading__load__percent">{percent}</div>
            <div className="rs-loading__load__animation__1" />
            <div className="rs-loading__load__animation__2" />
            <div className="rs-loading__load__animation__3" />
        </div>
    )
  }
  
  const getText = () => {
    return <div className="rs-loading__load__text">{text}</div>    
  }

  const getLoading = () => {
    return (
      <div 
        className="rs-loading__load"
        style = {{
          transform: `scale(${scale})`
        }}
      >
        {getAnimation()}
        {getText()}
      </div>
    )
  }

  const getProgress = () => {
      return (
          <div className="rs-loading__progress">
              <div 
                className="rs-loading__progress__bar" 
                style = {{
                  width: `${progress}%`
                }}
              />
          </div>
      )
  }

  const finalContent = () => {
    return (
        <div
            className={classnames(
            'rs-loading',
                {[`rs-loading--${type}`]: type},
                {'rs-loading--target': !!target },
                {'rs-loading--background': !!background},
              )}
        >
            {getLoading()}
            {progress && getProgress()}
        </div>
    )
  }


  return (
    <>{createPortal(isVisible && finalContent(), document.body)}</>
  );
}

Loading.propTypes = {
  text: t.string,
  type: t.string,
  color: t.oneOf(['primary', 'secondary', 'success', 'danger', 'warn', 'dark', 'light']),
  background: t.string,
  opacity: t.string,
  percent: t.string,
  progress: t.string,
  scale: t.string,
  target:t.any,
  isVisible:t.bool
};

export default Loading;