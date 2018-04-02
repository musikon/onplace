/**
 * Возвращает существительное в соответствующей словоформе для числа переданного первым аргументом
 *
 * @param {Number} num      Число
 * @param {Object} cases    Варианты слова {nom: 'час', gen: 'часа', plu: 'часов'}
 * @return {String}
 */
export default function (num, cases) {
  let word = '';

  const absNum = Math.abs(num);

  if (absNum.toString().indexOf('.') > -1) {
    word = cases.gen;
  } else {
    if (absNum % 10 === 1 && absNum % 100 !== 11) {
      word = cases.nom;
    } else if (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)) {
      word = cases.gen;
    } else {
      word = cases.plu;
    }
  }

  return word;
}
