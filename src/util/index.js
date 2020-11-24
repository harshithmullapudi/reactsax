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

export default getColor;
