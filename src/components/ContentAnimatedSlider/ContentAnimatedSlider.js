if (global.IS_BROWSER) {
  require('./ContentAnimatedSlider.styl'); // eslint-disable-line global-require
}

import { Motion, spring } from 'react-motion';
import Swipeable from 'react-swipeable';
import _ from 'lodash';
import { googleAnalytics } from '../../utils';

import React, {
  Component,
  PropTypes as Type,
} from 'react';

const scenesNamesArray = ['scene-one', 'scene-two', 'scene-three'];
const sceneOnePositionArray = [18.2, -14.2, 3.7];
const sceneTwoPositionArray = [-28.3, -4.3, -0.2];
const sceneThreePositionArray = [-46, -20.7, 0];
const springParams = { stiffness: 140, damping: 20 };
const textSpringParams = { stiffness: 140, damping: 18 };

const leftTextVersions = {};

leftTextVersions.ru = [
  'Достойная идея стартапа при поддержке площадки OnPlace привлечет инвестиции со всех концов планеты',
  'Низкие процентные ставки по кредитам и высокий уровень доходности для инвесторов',
  'Высокий уровень защиты инвестиций. Команда OnPlace несет ответственность за риски на проектах с высоким рейтингом'
];

leftTextVersions.en = [
  'A good startup idea with the support of OnPlace platform will attract investments from all over the world',
  'More effective than the banking system! Loans with low interest rates and high level of return for investors',
  'High level security. OnPlace team is financially responsible for risks on high rated projects'
];

const SLIDES_LENGTH = leftTextVersions.ru.length;

export default class ContentAnimatedSlider extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    lang: Type.string
  };

  constructor() {
    super();

    this.state = {
      activeSlideIndex: 0
    };

    this.timer = null;

    this.setSlideOffset = _.throttle(::this.setSlideOffset, 450);
    // this.runTimer();
  }

  /**
   * Invokes after the initial rendering of component
   */
  componentDidMount() {
    window.addEventListener('resize', this.setSlideOffset);

    this.handleImagesLoading();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setSlideOffset);
  }

  setActiveIndex(activeSlideIndex) {
    clearInterval(this.timer);

    this.setState({
      activeSlideIndex
    });
  }

  setSlideOffset() {
    const windowHeight = window.innerHeight;
    const footerHeight = _.get(document.getElementById('js-fixed-footer'), 'clientHeight');
    const headerHeight = document.getElementById('js-header').clientHeight;
    const spaceForSlide = windowHeight - (footerHeight || 0) - headerHeight;
    const slide = document.getElementById('js-slide');
    const slideHeight = slide.clientHeight;
    const diff = spaceForSlide - slideHeight;

    if (diff < 0) {
      slide.style.marginTop = `${ diff }px`;
    } else {
      slide.style.marginTop = 0;
    }
  }

  handleImagesLoading() {
    const allImages = document.getElementsByClassName('js-slide-image');
    const imageCount = allImages.length;
    let imagesLoaded = 0;

    const onLoadCallback = () => {
      imagesLoaded++;

      if (imagesLoaded === imageCount) {
        this.setSlideOffset();
      }
    };

    for (let i = 0; i < imageCount; i++) {
      allImages[i].onload = onLoadCallback;
    }
  }

  runTimer() {
    const slidesLength = scenesNamesArray.length;

    this.timer = setInterval(() => {
      this.setState({
        activeSlideIndex: (this.state.activeSlideIndex + 1) % slidesLength
      });
    }, 4000);
  }

  _googleEventRightArrow() {
    googleAnalytics({
      category: 'Investors',
      action: 'Promo right button pressed',
    });
  }

  _googleEventLeftArrow() {
    googleAnalytics({
      category: 'Investors',
      action: 'Promo left button pressed',
    });
  }

  _googleEventDots() {
    googleAnalytics({
      category: 'Investors',
      action: 'Promo dots pressed',
    });
  }

  arrowRightClick() {
    const { activeSlideIndex } = this.state;
  
    const newActiveIndex = (activeSlideIndex + SLIDES_LENGTH + 1) % SLIDES_LENGTH;
  
    this.setActiveIndex(newActiveIndex);
    this._googleEventRightArrow();
  }

  arrowLeftClick() {
    const { activeSlideIndex } = this.state;
  
    const newActiveIndex = (activeSlideIndex + SLIDES_LENGTH - 1) % SLIDES_LENGTH;
  
    this.setActiveIndex(newActiveIndex);
    this._googleEventLeftArrow();
  }

  dotsClick(index) {
    this.setActiveIndex(index);
    this._googleEventDots();
  }

  /**
   * Renders 'ContentAnimatedSlider' component
   */
  render() {
    const { activeSlideIndex } = this.state;
    const { lang } = this.props;

    const leftText = leftTextVersions[lang];

    return (
      <div className="c-content-animated-slider">
        <div
          id="js-slide"
          className={`content-animated-slider-inner ${ scenesNamesArray[activeSlideIndex] }`}
        >
          <Motion style={{ left: spring(sceneOnePositionArray[activeSlideIndex], springParams) }}>
            {({ left }) =>
              <div
                className="layer-one"
                style={{ left: `${ left }%` }}
              >
                <img
                  src="/images/layer-one.svg"
                  alt="layer-one"
                  className="layer-one-image js-slide-image"
                />
              </div>
            }
          </Motion>

          <Motion style={{ right: spring(sceneTwoPositionArray[activeSlideIndex], springParams) }}>
            {({ right }) =>
              <div
                className="layer-two"
                style={{ right: `${ right }%` }}
              >
                <img
                  src="/images/layer-two.svg"
                  alt="layer-two"
                  className="layer-two-image js-slide-image"
                />
              </div>
            }
          </Motion>

          <Motion style={{ right: spring(sceneThreePositionArray[activeSlideIndex], springParams) }}>
            {({ right }) =>
              <div
                className="layer-three"
                style={{ right: `${ right }%` }}
              >
                <img
                  src="/images/layer-three.svg"
                  alt="layer-three"
                  className="layer-three-image js-slide-image"
                />
              </div>
            }
          </Motion>
        </div>
        <Swipeable
          className="swipeable-container"
          onSwipedLeft={() => this.setActiveIndex(_.clamp(activeSlideIndex + 1, 0, scenesNamesArray.length - 1))}
          onSwipedRight={() => this.setActiveIndex(_.clamp(activeSlideIndex - 1, 0, scenesNamesArray.length - 1))}
        />
        <div className="pagination-container">
          {
            scenesNamesArray.length > 1 && _.map(scenesNamesArray, (name, index) => (
              <div
                className={`slide-point ${ index === activeSlideIndex ? 'active' : '' }`}
                key={index}
                onClick={this.dotsClick.bind(this, index)}
              ></div>
            ))
          }
        </div>
        <div
          className="icon-slider-arrows icon-slider-arrow-left"
          onClick={this.arrowLeftClick.bind(this, activeSlideIndex, scenesNamesArray)}
        >
        </div>
        <div
          className="icon-slider-arrows icon-slider-arrow-right"
          onClick={this.arrowRightClick.bind(this, activeSlideIndex, scenesNamesArray)}
        >
        </div>
        <div className="slide-text-container">
          <div className="slide-text-inner">
            <div className={`left-text-wrapper ${ activeSlideIndex === 2 ? 'third-slide' : '' }`}>
              {
                leftText.map((text, index) => (
                  <Motion
                    key={index}
                    style={{
                      left: spring(index === activeSlideIndex ? 0 : -250, textSpringParams),
                      opacity: spring(index === activeSlideIndex ? 1 : 0)
                    }}
                  >
                    {({ left, opacity }) =>
                      <div
                        className="left-text"
                        style={{ left: `${ left }%`, opacity }}
                      >
                        {text}
                      </div>
                    }
                  </Motion>
                ))
              }
            </div>
            <div className="right-text-wrapper">
              <div className="right-top-text">
                Гарантия возврата инвестиций и получения прибыли.
              </div>
              <div className="right-bottom-text">
                ЛИЦЕНЗИРОВАНО ЦЕНТРОБАНКОМ
              </div>
            </div>
            <img
              src="/images/coat.png"
              alt="coat"
              className="coat"
            />
          </div>
        </div>
      </div>
    );
  }
}
