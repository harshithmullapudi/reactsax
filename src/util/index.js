const isColor = (color) => {
  const vsColors = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'dark',
    'light',
    'warn',
    // social colors
    'facebook',
    'twitter',
    'youtube',
    'pinterest',
    'linkedin',
    'snapchat',
    'whatsapp',
    'tumblr',
    'reddit',
    'spotify',
    'amazon',
    'medium',
    'vimeo',
    'skype',
    'dribbble',
    'slack',
    'yahoo',
    'twitch',
    'discord',
    'telegram',
    'google-plus',
    'messenger',
  ];
  return vsColors.includes(color);
};

const setVar = (propertyName, value, el) => {
  if (!el) {
    document.documentElement.style.setProperty(`--rs-${propertyName}`, value);
  } else {
    if (el.nodeName !== '#comment') {
      el.style.setProperty(`--rs-${propertyName}`, value);
    }
  }
};

const getColor = (color) => {
  function hexToRgb(hex) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          // tslint:disable-next-line:object-literal-sort-keys
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  const isRGB = /^(rgb|rgba)/.test(color);
  const isRGBNumbers = /^(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)$/.test(
    color,
  );
  const isHEX = /^(#)/.test(color);
  let newColor;

  if (isRGB) {
    const arrayColor = color.replace(/[rgba()]/g, '').split(',');
    newColor = `${arrayColor[0]},${arrayColor[1]},${arrayColor[2]}`;
  } else if (isHEX) {
    const rgb = hexToRgb(color);
    newColor = `${rgb.r},${rgb.g},${rgb.b}`;
  } else if (isColor(color)) {
    const style = window.getComputedStyle(document.body);
    newColor = style.getPropertyValue('--rs-' + color);
  } else if (isRGBNumbers) {
    newColor = color;
  }
  return newColor;
};

const setCords = (element, parent) => {
  const cords = parent.getBoundingClientRect();
  const x = cords.x;
  const y = cords.y;
  const w = cords.width;
  const h = cords.height;
  const style = element.style;
  const scrollTop = window.pageYOffset;
  const elTop = element.clientHeight + cords.y + scrollTop;
  const rootTop = scrollTop + window.innerHeight;

  if (rootTop - elTop < 30) {
    // console.log('hola mundo')
    style.top = `${y + scrollTop - element.clientHeight - 4}px`;
    style.left = `${x}px`;
    style.width = `${w}px`;
    element.classList.add('top');
    parent.classList.add('top');
  } else {
    style.top = `${y + scrollTop + h - 4}px`;
    style.left = `${x}px`;
    style.width = `${w}px`;
    element.classList.remove('top');
    parent.classList.remove('top');
  }
};

const setCordsPosition = (element, parent, position) => {
  const cords = parent.getBoundingClientRect();
  const x = cords.x;
  const y = cords.y;
  const w = cords.width;
  const h = cords.height;
  const style = element.style;
  const scrollTop = window.pageYOffset;
  const elTop = element.clientHeight + cords.y + scrollTop;
  const rootTop = scrollTop + window.innerHeight;

  if (
    x + w + 10 + element.getBoundingClientRect().width > window.innerWidth &&
    position === 'right'
  ) {
    position = 'left';
    element.classList.remove('right');
    element.classList.add('left');
  }

  if (x - 10 < element.getBoundingClientRect().width && position === 'left') {
    position = 'top';
    element.classList.remove('left');
    element.classList.add('top');
  }

  if (rootTop - elTop < 30 || position === 'top') {
    // console.log('hola mundo')
    style.top = `${y + scrollTop - element.clientHeight - 8}px`;
    const left = x + (w - element.getBoundingClientRect().width) / 2;

    if (left + element.getBoundingClientRect().width < window.innerWidth) {
      if (left > 0) {
        style.left = `${left}px`;
      } else {
        style.left = '10px';
        element.classList.add('notArrow');
      }
    } else {
      style.left = 'auto';
      style.right = '10px';
      element.classList.add('notArrow');
    }
  } else if (position === 'bottom') {
    style.top = `${y + scrollTop + h + 8}px`;
    const left = x + (w - element.getBoundingClientRect().width) / 2;

    if (left + element.getBoundingClientRect().width < window.innerWidth) {
      if (left > 0) {
        style.left = `${left}px`;
      } else {
        style.left = '10px';
        element.classList.add('notArrow');
      }
    } else {
      style.left = 'auto';
      style.right = '10px';
      element.classList.add('notArrow');
    }
  } else if (position === 'left') {
    style.top = `${y + scrollTop + (h - element.getBoundingClientRect().height) / 2}px`;
    style.left = `${x - element.getBoundingClientRect().width - 8}px`;
  } else if (position === 'right') {
    style.top = `${y + scrollTop + (h - element.getBoundingClientRect().height) / 2}px`;
    style.left = `${x + w + 8}px`;
  }
};

const insertBody = (element, parent) => {
  const target = parent ? parent : document.body;
  target.insertBefore(element, target.lastChild);
};

const removeBody = (element, parent) => {
  const target = parent ? parent : document.body;
  target.removeChild(element);
};

export { setCords, setCordsPosition, setVar, insertBody, removeBody };

export default getColor;
