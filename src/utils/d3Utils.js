import d3 from 'd3';

export const hexToColorMatrix = (color, opacity) => {
  const rgbColor = d3.rgb(color);
  const matrix = '0 0 0 red 0 0 0 0 0 green 0 0 0 0 blue 0 0 0 opacity 0';
  
  return matrix
    .replace('red', rgbColor.r)
    .replace('green', rgbColor.g)
    .replace('blue', rgbColor.b)
    .replace('opacity', opacity || 0.5);
};
