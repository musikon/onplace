export const hexToRgb = function (hex) {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = `0x ${ c.join('') }`;
    return `rgba(${ [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') },1)`;
  }
  // if nothing was passed - set white color for mainPage
  return 'rgba(255,255,255,1)';
};

export const isWhiteTheme = function (rgb) {
  const o = Math.round(((parseInt(rgb[0], 10) * 299) + (parseInt(rgb[1], 10) * 587) +
          (parseInt(rgb[2], 10) * 114)) / 1000);

  // 125 was default -> but in our case need to slightly increase
  // const isWhiteTheme = !(o > 125);
  const isWhite = !(o > 128);
  return isWhite;
};
