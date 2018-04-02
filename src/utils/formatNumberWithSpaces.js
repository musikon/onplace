export default (number, signRequired) => {
  const isPositiveNumber = number > 0;
  const sign = signRequired && isPositiveNumber ? '+' : '';

  return number && `${ sign }${ number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') }`;
};
