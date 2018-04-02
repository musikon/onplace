/**
 * @description
 * Animation with requestAnimationFrame
 *
 * @param {number} options.duration   Animation duration in ms
 * @param {Function} options.easing   Easing function
 * @param {Function} options.drawFunctionParams     Set of params for function which draw current animation condition
 * @param {Function} options.drawFunctionParams.element   DOM element
 * @param {Function} options.drawFunctionParams.property  property which be animated
 * @param {Function} options.drawFunctionParams.value   value for property after ending of animation
 */
export default function (options, callback = () => {}) {
  const start = performance.now();

  const {
    element,
    property,
    value,
  } = options.drawFunctionParams;

  const currentAnimatedPropertyValue = property === 'scrollTop'
    ? document.documentElement.scrollTop || document.body.scrollTop
    : element[property];

  const diff = value - currentAnimatedPropertyValue;

  const functionForAnimationTickDrawing = progress => {
    const newValue = currentAnimatedPropertyValue + progress * diff;

    element[property] = newValue;

    if (element === document.body && element[property] !== newValue) {
      document.documentElement[property] = newValue;
    }
  };

  requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / options.duration;
    if (timeFraction > 1) timeFraction = 1;

    const progress = options.easing(timeFraction);

    functionForAnimationTickDrawing(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    } else {
      callback();
    }
  });
}

// most common easing functions
// from this gist - https://gist.github.com/gre/1650294
/* eslint-disable */

// no easing, no acceleration
export const linear = function (t) { return t };
// accelerating from zero velocity
export const easeInQuad = function (t) { return t*t };
// decelerating to zero velocity
export const easeOutQuad = function (t) { return t*(2-t) };
// acceleration until halfway, then deceleration
export const easeInOutQuad = function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t };
// accelerating from zero velocity
export const easeInCubic = function (t) { return t*t*t };
// decelerating to zero velocity
export const easeOutCubic = function (t) { return (--t)*t*t+1 };
// acceleration until halfway, then deceleration
export const easeInOutCubic = function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 };
// accelerating from zero velocity
export const easeInQuart = function (t) { return t*t*t*t };
// decelerating to zero velocity
export const easeOutQuart = function (t) { return 1-(--t)*t*t*t };
// acceleration until halfway, then deceleration
export const easeInOutQuart = function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t };
// accelerating from zero velocity
export const easeInQuint = function (t) { return t*t*t*t*t };
// decelerating to zero velocity
export const easeOutQuint = function (t) { return 1+(--t)*t*t*t*t };
// acceleration until halfway, then deceleration
export const easeInOutQuint = function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t };

export const bezier = function (x1, y1, x2, y2, epsilon) {
  var curveX = function(t){
    var v = 1 - t;
    return 3 * v * v * t * x1 + 3 * v * t * t * x2 + t * t * t;
  };
  
  var curveY = function(t){
    var v = 1 - t;
    return 3 * v * v * t * y1 + 3 * v * t * t * y2 + t * t * t;
  };
  
  var derivativeCurveX = function(t){
    var v = 1 - t;
    return 3 * (2 * (t - 1) * t + v * v) * x1 + 3 * (- t * t * t + 2 * v * t) * x2;
  };
  
  return function(t){
    var x = t, t0, t1, t2, x2, d2, i;
    
    // First try a few iterations of Newton's method -- normally very fast.
    for (t2 = x, i = 0; i < 8; i++){
      x2 = curveX(t2) - x;
      if (Math.abs(x2) < epsilon) return curveY(t2);
      d2 = derivativeCurveX(t2);
      if (Math.abs(d2) < 1e-6) break;
      t2 = t2 - x2 / d2;
    }
    
    t0 = 0, t1 = 1, t2 = x;
    
    if (t2 < t0) return curveY(t0);
    if (t2 > t1) return curveY(t1);
    
    // Fallback to the bisection method for reliability.
    while (t0 < t1){
      x2 = curveX(t2);
      if (Math.abs(x2 - x) < epsilon) return curveY(t2);
      if (x > x2) t0 = t2;
      else t1 = t2;
      t2 = (t1 - t0) * .5 + t0;
    }
    
    // Failure
    return curveY(t2);
  };
};
/* eslint-enable */
