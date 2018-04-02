import _delay from 'lodash/delay';
import _forEach from 'lodash/forEach';
import _map from 'lodash/map';
import _times from 'lodash/times';

let sliderLayout = '';
let isFirefox = false;

if (global.IS_BROWSER) {
  /* eslint-disable */
  require('./PromoBlockSlider.styl');
  sliderLayout = require('html-loader!./slider.html');
  isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

  const Snap = require('imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js');
  /* eslint-disable */
}

import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';

import React, {
  Component,
  PropTypes as Type,
} from 'react';

import {
  easings,
  DOMUtils
} from '../../utils';

import { slideInBase64 } from './slideInBase64';

const {
  addClass,
  removeClass,
  hasClass,
  filterByClassName,
  closest
} = DOMUtils;

const { bezier } = easings;

const slideTextVersions = {};

slideTextVersions.ru = [
  'On Place — это площадка, на которой частные инвесторы находят достойные проекты для вложения своих средств',
  `Вложите свободные средства от
1000 <span class="g-currency">;</span> и получают прибыль выше, чем на банковском депозите`,
  'Опубликуйте свой проект и получите частные инвестиции для развития — выгоднее, чем через кредиты'
];

slideTextVersions.en = [
  'A good startup idea with the support of OnPlace platform will attract investments from all over the world',
  'More profitable than the banking system! Loans with low interest rates and high level of return for investors',
  'High level security. OnPlace team is financially responsible for risks on high rated projects'
];

export default class PromoBlockSlider extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    lang: Type.string
  };

  constructor() {
    super();

    this.runTimer = this.runTimer.bind(this);

    this.slidesLength = 3;
    this.slideChangeDelay = 4000;

    this.state = {
      imageWasLoaded: false,
      activeSlideIndex: 0,
    };
  }

  /**
   * Invokes after the initial rendering of component
   */
  componentDidMount() {
    /* eslint-disable */
    const duration = 400;
    const epsilon = (1000 / 60 / duration) / 4;
    const customMinaAnimation = bezier(.42,.03,.77,.63, epsilon);
    let heightSlider = 0;

    const reactComponent = this;

    const radialSlider = function(element) {
      this.element = element;

      let counter = 0;

      const loadedNodes = isFirefox
				? this.element.querySelectorAll('image')
				: this.element.querySelectorAll('.js-slide-svg');

      if (document.readyState === 'complete') {
        heightSlider = document.querySelector('.c-promo-block-slider-root').clientHeight;

				if (heightSlider < 100) {
					_delay(() => {
						heightSlider = document.querySelector('.c-promo-block-slider-root').clientHeight;
						reactComponent.props.positionRegistrationButton(heightSlider);
						reactComponent.setState({ imageWasLoaded: true });
					}, 1000)
				} else {
					reactComponent.props.positionRegistrationButton(heightSlider);
					reactComponent.setState({ imageWasLoaded: true });
				}
      } else {
        _forEach(loadedNodes, (image) => {
          image.addEventListener('load', () => {
            counter++;

            if (counter === 3) {
              reactComponent.setState({ imageWasLoaded: true });
              heightSlider = document.querySelector('.c-promo-block-slider-root').clientHeight;
              reactComponent.props.positionRegistrationButton(heightSlider);
            }
          });
        });
      }
      this.viewportWidth = 1400;
      this.viewportHeigth = 800;
      this.previewCircleRadius = 58;

      this.cursorOnNavigation = false;
      this.slider = this.element.querySelectorAll('.cd-radial-slider')[0];
      this.slides = this.slider.querySelectorAll('li');
      this.slidesNumber = this.slides.length;
      this.visibleIndex = 0;
      this.nextVisible = 1;
      this.prevVisible = this.slidesNumber - 1;
      this.navigation = this.element.querySelectorAll('.js-nav-arrow');
      this.animating = false;
      this.svgWrapper = this.element.querySelectorAll('.visible .svg-wrapper')[0];
      this.nextIcon = this.element.querySelectorAll('.js-next-icon')[0];
      this.prevIcon = this.element.querySelectorAll('.js-prev-icon')[0];
      this.timerID = null;

      this.handleResize = this.handleResize.bind(this);
      this.handleLoad = this.handleLoad.bind(this);
      this.handleBlur = this.handleBlur.bind(this);
      this.handleFocus = this.handleFocus.bind(this);

      this.handleLoad();
      this.bindEvents();
    }

    radialSlider.prototype.handleFocus = function () {
      if (reactComponent.state.imageWasLoaded) {
        clearInterval(reactComponent.timer);
        reactComponent.runTimer();
      }
    };

    radialSlider.prototype.handleBlur = function () {
      clearInterval(reactComponent.timer);
    };

    radialSlider.prototype.handleLoad = function() {
      const circles = this.element.querySelectorAll('circle');

      _forEach(circles, circle => {
        circle.setAttribute('style', '');
      });

      this.handleResize();
    };

    radialSlider.prototype.handleResize = function() {
      const xCoef = window.innerWidth / this.viewportWidth;

      const {
        height: svgWrapperHeight,
        top: svgWrapperTop
      } = this.svgWrapper.getBoundingClientRect();

      const yCoef = svgWrapperHeight / this.viewportHeigth;

      const {
        left: nextIconLeft,
        top: nextIconTop,
        width: nextIconWidth,
        height: nextIconHeight
      } = this.nextIcon.getBoundingClientRect();

      const nextIconCenterX = nextIconLeft + nextIconWidth / 2;
      const nextIconCenterY = nextIconTop - svgWrapperTop + nextIconHeight / 2;

      const {
        left: prevIconLeft
      } = this.prevIcon.getBoundingClientRect();

      const prevIconCenterX = prevIconLeft + nextIconWidth / 2;
      const prevIconCenterY = nextIconCenterY;

      const prevSlideCircle = this.element.querySelectorAll('.prev-slide circle')[0];
      const nextSlideCircle = this.element.querySelectorAll('.next-slide circle')[0];

      this.slider.setAttribute('data-centerx1', prevIconCenterX / xCoef);
      this.slider.setAttribute('data-centerx2', nextIconCenterX / xCoef);
      this.slider.setAttribute('data-centery', nextIconCenterY / yCoef);
      this.slider.setAttribute('data-radius1', this.previewCircleRadius / xCoef / 2);

      prevSlideCircle.setAttribute('cx', prevIconCenterX / xCoef);
      prevSlideCircle.setAttribute('cy', prevIconCenterY / yCoef);
      prevSlideCircle.setAttribute('r', this.previewCircleRadius / xCoef / 2);

      nextSlideCircle.setAttribute('cx', nextIconCenterX / xCoef);
      nextSlideCircle.setAttribute('cy', nextIconCenterY / yCoef);
      nextSlideCircle.setAttribute('r', this.previewCircleRadius / xCoef / 2);

      const {
        left: prevSlideCircleLeft,
        width: prevSlideCircleWidth
      } = prevSlideCircle.getBoundingClientRect();

      const {
        left: nextSlideCircleLeft,
        width: nextSlideCircleWidth
      } = nextSlideCircle.getBoundingClientRect();

      const prevSlideCircleCenterX = prevSlideCircleLeft + prevSlideCircleWidth / 2;
      let prevSlideCircleDiff = prevSlideCircleCenterX - prevIconCenterX;

      const nextSlideCircleCenterY = nextSlideCircleLeft + nextSlideCircleWidth / 2;
      let nextSlideCircleDiff = nextSlideCircleCenterY - nextIconCenterX;

      if (document.readyState === 'complete') {
        if (isFirefox) {
          prevSlideCircleDiff = -2;
          nextSlideCircleDiff = -3; //yes, it's hardcode! Firefox can't calculate getBoundingClientRect for svg def
        }

        if (Math.abs(prevSlideCircleDiff) > 1) {
          prevSlideCircle.setAttribute('cx', (prevIconCenterX - prevSlideCircleDiff) / xCoef);
          this.slider.setAttribute('data-centerx1', (prevIconCenterX - prevSlideCircleDiff) / xCoef);
        }

        if (Math.abs(nextSlideCircleDiff) > 1) {
          nextSlideCircle.setAttribute('cx', (nextIconCenterX - nextSlideCircleDiff) / xCoef);
          this.slider.setAttribute('data-centerx2', (nextIconCenterX - prevSlideCircleDiff) / xCoef);
        }
      }
    }

    radialSlider.prototype.unbindEvents = function() {
      window.removeEventListener('resize', this.handleResize);
      window.removeEventListener('blue', this.handleBlur);
      window.removeEventListener('focus', this.handleFocus);
    }

    radialSlider.prototype.toggleSlide = function(direction) {
      this.animating =  true;

      this.updateIndexes(direction);
      this.updateSlides(direction);
    }

    radialSlider.prototype.bindEvents = function() {
      const self = this;

      _forEach(this.navigation, navigationNode => {
        navigationNode.addEventListener('click', function(event){
          if( !self.animating ) {
            self.animating =  true;
            event.preventDefault();

            const targetNode = event.target;
            const isNavArrowNode = hasClass(targetNode, 'nav-arrow');

            const navNode = isNavArrowNode
              ? targetNode
              : closest(targetNode, element => hasClass(element, 'nav-arrow'));

            const direction = (hasClass(navNode, 'js-next') ? 'next' : 'prev');
            const currentActiveIndex = reactComponent.state.activeSlideIndex;
            const slidesLength = self.slides.length;

            const newActiveIndex = direction === 'next'
              ? (currentActiveIndex + slidesLength + 1) % slidesLength
              : (currentActiveIndex + slidesLength - 1) % slidesLength;

            reactComponent.setState({
              activeSlideIndex: newActiveIndex
            });

            self.updateIndexes(direction);
            self.updateSlides(direction);

            if (reactComponent.timer !== self.timerID) {
              clearInterval(reactComponent.timer);
              reactComponent.runTimer();
            }
          }
        });

        navigationNode.addEventListener('mouseenter', (event) => {
          const isNext = hasClass(event.target, 'js-next');
          const slideSvg = this.element.querySelectorAll(`.${ isNext ? 'next-slide' : 'prev-slide' } .svg-wrapper`)[0];

          this.cursorOnNavigation = true;
          clearInterval(reactComponent.timer);
          this.timerID = reactComponent.timer;

          addClass(slideSvg, 'transitioned');
          addClass(slideSvg, 'show');
        });

        navigationNode.addEventListener('mouseleave', (event) => {
          const isNext = hasClass(event.target, 'js-next');
          const slideSvg = this.element.querySelectorAll(`.${ isNext ? 'next-slide' : 'prev-slide' } .svg-wrapper`)[0];

          this.cursorOnNavigation = false;

          clearInterval(reactComponent.timer);
          reactComponent.runTimer();

          addClass(slideSvg, 'transitioned');
          removeClass(slideSvg, 'show');
        });
      });

      window.addEventListener('resize', this.handleResize);
      window.addEventListener('load', this.handleLoad);
      window.addEventListener('blur', this.handleBlur);
      window.addEventListener('focus', this.handleFocus);
    }

    radialSlider.prototype.updateIndexes = function(direction) {
      if(  direction == 'next' ) {
        this.prevVisible = this.visibleIndex;
        this.visibleIndex = this.nextVisible;
        this.nextVisible = (this.nextVisible + 1 < this.slidesNumber) ? this.nextVisible + 1 : 0;
      } else {
        this.nextVisible = this.visibleIndex;
        this.visibleIndex = this.prevVisible;
        this.prevVisible = (this.prevVisible > 0) ? this.prevVisible - 1 : this.slidesNumber - 1;
      }
    }

    radialSlider.prototype.updateSlides = function(direction) {
      const self = this;

      const clipPathVisible = Snap('#'+this.slides[this.visibleIndex].querySelectorAll('circle')[0].getAttribute('id')),
        clipPathPrev = Snap('#'+this.slides[this.prevVisible].querySelectorAll('circle')[0].getAttribute('id')),
        clipPathNext = Snap('#'+this.slides[this.nextVisible].querySelectorAll('circle')[0].getAttribute('id'));

      const radius1 = this.slider.getAttribute('data-radius1');
      const radius2 = this.slider.getAttribute('data-radius2');

      const centerx = ( direction == 'next' )
          ? this.slider.getAttribute('data-centerx2')
          : this.slider.getAttribute('data-centerx1');

      const visibleSlide = this.slides[this.visibleIndex];

      addClass(visibleSlide, 'is-animating');
      removeClass(visibleSlide, 'next-slide');
      removeClass(visibleSlide, 'prev-slide');

      if( direction == 'next' ) {
        addClass(this.slides[this.visibleIndex], 'content-reveal-left');
        addClass(this.slides[this.prevVisible], 'content-hide-left');

        clipPathNext.attr({
          'r': radius1,
          'cx': self.slider.getAttribute('data-centerx2'),
          'cy': self.slider.getAttribute('data-centery')
        });

        addClass(this.slides[this.nextVisible], 'next-slide');
        addClass(this.slides[this.nextVisible], 'move-up');
      } else {
        addClass(this.slides[this.visibleIndex], 'content-reveal-right');
        addClass(this.slides[this.nextVisible], 'content-hide-right');

        clipPathPrev.attr({
          'r': radius1,
          'cx': this.slider.getAttribute('data-centerx1'),
          'cy': self.slider.getAttribute('data-centery')
        });

        addClass(this.slides[this.prevVisible], 'prev-slide');
        addClass(this.slides[this.prevVisible], 'move-up');
      }

      clipPathVisible
      .attr({
        'r': radius1,
        'cx': centerx,
      })
      .animate({'r': radius2}, duration, customMinaAnimation, function(){
        if ( direction == 'next' ) {
          const prevSlide = filterByClassName(self.slides, 'prev-slide')[0];

          removeClass(prevSlide, 'prev-slide');

          clipPathPrev.attr({
            'r': radius1,
            'cx': self.slider.getAttribute('data-centerx1'),
            'cy': self.slider.getAttribute('data-centery')
          });

          removeClass(self.slides[self.prevVisible], 'visible');
          addClass(self.slides[self.prevVisible], 'prev-slide');
          removeClass(self.slides[self.prevVisible].children[0], 'transitioned');

          addClass(self.slides[self.nextVisible].children[0], 'transitioned');
          addClass(self.slides[self.nextVisible].children[0], 'show');
        } else {
          const nextSlide = filterByClassName(self.slides, 'next-slide')[0];

          removeClass(nextSlide, 'next-slide');

          clipPathNext.attr({
            'r': radius1,
            'cx': self.slider.getAttribute('data-centerx2'),
            'cy': self.slider.getAttribute('data-centery')
          });

          removeClass(self.slides[self.nextVisible], 'visible');

          addClass(self.slides[self.nextVisible], 'next-slide');
          removeClass(self.slides[self.nextVisible].children[0], 'transitioned');

          addClass(self.slides[self.prevVisible].children[0], 'transitioned');
          addClass(self.slides[self.prevVisible].children[0], 'show');
        }

        removeClass(self.slides[self.visibleIndex], 'is-animating');
        addClass(self.slides[self.visibleIndex], 'visible');

        removeClass(self.slides[self.visibleIndex].children[0], 'show');

        self.slides[self.visibleIndex].querySelectorAll('image')[0].setAttribute('style', '');

        const moveUpSlide = filterByClassName(self.slides, 'move-up')[0];

        removeClass(moveUpSlide, 'move-up');

        if (!self.cursorOnNavigation) {
          const nextSlideSvg = self.element.querySelectorAll('.next-slide .svg-wrapper')[0];
          const prevSlideSvg = self.element.querySelectorAll('.prev-slide .svg-wrapper')[0];

          removeClass(nextSlideSvg, 'show');
          removeClass(prevSlideSvg, 'show');
        }

        setTimeout(function(){
          removeClass(self.slides[self.visibleIndex], 'content-reveal-left');
          removeClass(self.slides[self.visibleIndex], 'content-reveal-right');

          removeClass(self.slides[self.prevVisible], 'content-hide-left');
          removeClass(self.slides[self.prevVisible], 'content-hide-right');

          removeClass(self.slides[self.nextVisible], 'content-hide-left');
          removeClass(self.slides[self.nextVisible], 'content-hide-right');

          self.animating = false;
        }, 100);
      });
    }

    const { lang } = this.props;

    _forEach(
      document.querySelectorAll('.js-slide-text'),
      (slideTextDiv, index) => (slideTextDiv.innerHTML = slideTextVersions[lang][index])
    );

    this.radialSlider = new radialSlider(document.querySelectorAll('.js-promo-block-slider-root')[0]);
    /* eslint-enable */

    clearInterval(reactComponent.timer);
    reactComponent.runTimer();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lang !== this.props.lang) {
      _forEach(
        document.querySelectorAll('.js-slide-text'),
        (slideTextDiv, index) => (slideTextDiv.innerHTML = slideTextVersions[nextProps.lang][index])
      );
    }
  }

  runTimer() {
    this.timer = setInterval(() => {
      const { activeSlideIndex } = this.state;
      const newActiveIndex = (activeSlideIndex + this.slidesLength + 1) % this.slidesLength;

      this.dotsClick(newActiveIndex);
    }, this.slideChangeDelay);
  }

  dotsClick(index) {
    if (this.radialSlider.animating) {
      return false;
    }

    const { activeSlideIndex } = this.state;

    if (index === activeSlideIndex) {
      return false;
    }

    let direction = index < activeSlideIndex ? 'prev' : 'next';

    if (index === 0 && activeSlideIndex === 2) {
      direction = 'next';
    }

    if (index === 2 && activeSlideIndex === 0) {
      direction = 'prev';
    }

    this.setState({
      activeSlideIndex: index
    });

    this.radialSlider.toggleSlide(direction);

    clearInterval(this.timer);
    this.runTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.radialSlider.unbindEvents();
  }

  /**
   * Renders 'PromoBlockSlider' component
   */
  render() {
    const { activeSlideIndex, imageWasLoaded } = this.state;

    return (
      <div
        className="c-promo-block-slider-root js-promo-block-slider-root"
        style={imageWasLoaded ? styles.lowQualitySlide : styles.lowQualitySlideHidden}
      >
        <div className="nav-arrow-container js-navigation-container">
          <div className="nav-arrow js-nav-arrow js-prev">
            <ArrowBackIcon className="js-prev-icon" />
          </div>
          <div className="nav-arrow js-nav-arrow js-next">
            <ArrowForwardIcon className="js-next-icon" />
          </div>
        </div>
        <div
          style={imageWasLoaded ? styles.lowQualitySlideContainer : styles.lowQualitySlide}
          className="low-quality-slide">
          <img
            style={styles.lowQualitySlideImage}
            src={slideInBase64}
            alt=""
          />
        </div> :
        <div className="pagination-container">
          {
            _map(_times(this.slidesLength), (name, index) => (
              <div
                className={`slide-point ${ index === activeSlideIndex ? 'active' : '' }`}
                key={index}
                onClick={this.dotsClick.bind(this, index)}
              ></div>
            ))
          }
        </div>
        <div
          className="radial-slider-wrapper"
          dangerouslySetInnerHTML={{ __html: sliderLayout }}
        ></div>
      </div>
    );
  }
}

const styles = {
  lowQualitySlide: {
    width: '100%',
    zIndex: 358
  },
  lowQualitySlideHidden: {
    zIndex: 355
  },
  lowQualitySlideContainer: {
    width: '100%',
    maxHeight: 'calc(100vh - 2rem)'
  },
  lowQualitySlideImage: {
    height: '100%',
    width: '100%'
  }
};
