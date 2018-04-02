if (global.IS_BROWSER) {
  require('./Slider.styl'); // eslint-disable-line global-require
}

import { Link } from 'react-router';
import _times from 'lodash/times';
import { googleAnalytics } from '../../utils';
import React, { cloneElement, Component, PropTypes as Type } from 'react';
import NextArrow from 'material-ui/svg-icons/navigation/arrow-forward';
import PrewArrow from 'material-ui/svg-icons/navigation/arrow-back';

const arrowStyle = {
  opacity: 0.8,
  cursor: 'pointer',
  width: `${ 24 / 16 }rem`,
  height: `${ 24 / 16 }rem`,
  transition: '0.5s'
};

export default class Slider extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    allItemsLink: Type.string,
    allItemsText: Type.string,
    children: Type.object,
    chunksLength: Type.number,
    isMobile: Type.bool,
    isProjectsSlider: Type.bool,
    slidesRootClassName: Type.string,
    specialMove: Type.bool,
    title: Type.string,
    withArrows: Type.bool,
    arrowsMidle: Type.bool,
    withPagination: Type.bool,
    isTeam: Type.bool,
    numItemInLastChunk: Type.number,
    itemsInChunk: Type.number
  };

  constructor() {
    super();

    this.state = {
      activeSlideIndex: 0,
      containerOnHover: false
    };
  }

  setActiveIndex(activeSlideIndex) {
    this.setState({
      activeSlideIndex
    });
  }

  setMovementLong(activeSlideIndex) {
    let movementLong = 0;

    const {
      numItemInLastChunk,
      itemsInChunk,
      specialMove
    } = this.props;

    const diff = ((itemsInChunk - numItemInLastChunk) / itemsInChunk).toFixed(4) * 100;

    if (activeSlideIndex === 1 && specialMove) {
      movementLong = activeSlideIndex * diff;
    } else {
      movementLong = activeSlideIndex * 100;
    }

    return movementLong;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.chunksLength !== this.props.chunksLength) {
      this.setState({
        activeSlideIndex: 0
      });
    }
  }

  _googleEventTeamRightArrow() {
    googleAnalytics({
      category: 'Usability',
      action: 'Team right button pressed',
    });
  }

  _googleEventTeamLeftArrow() {
    googleAnalytics({
      category: 'Usability',
      action: 'Team left button pressed',
    });
  }

  arrowRightClick(isTeam) {
    const { activeSlideIndex } = this.state;
    const { chunksLength } = this.props;

    const newActiveIndex = (activeSlideIndex + chunksLength + 1) % chunksLength;

    this.setActiveIndex(newActiveIndex);

    if (isTeam) {
      this._googleEventTeamRightArrow();
    }
  }

  arrowLeftClick(isTeam) {
    const { activeSlideIndex } = this.state;
    const { chunksLength } = this.props;

    const newActiveIndex = (activeSlideIndex + chunksLength - 1) % chunksLength;

    this.setActiveIndex(newActiveIndex);

    if (isTeam) {
      this._googleEventTeamLeftArrow();
    }
  }

  /**
   * Renders 'Slider' component
   */
  render() {
    const { activeSlideIndex } = this.state;

    const {
      allItemsLink,
      allItemsText,
      chunksLength,
      withArrows,
      arrowsMidle,
      slidesRootClassName,
      withPagination,
      title,
      isTeam,
      isProjectsSlider
    } = this.props;

    return (
      <div
        className={
          `c-slider-root
          ${ slidesRootClassName || '' }
          ${ this.state.containerOnHover ? 'hovered' : '' }
          active-slide-${ activeSlideIndex }`
        }
      >
        <div className={`slider-inner active-slide-${ activeSlideIndex } ${ isProjectsSlider ? 'projects' : '' }`}>
          <h2 className="g-main-page-title main-page-slider-title">
            {title}
          </h2>
          <div
            className="slides-container"
            style={{ left: `-${ this.setMovementLong(activeSlideIndex) }%` }}
            onMouseEnter={() => this.setState({ containerOnHover: true })}
            onMouseLeave={() => this.setState({ containerOnHover: false })}
          >
            {cloneElement(this.props.children)}
          </div>
          {
            withPagination &&
              <div
                className={
                  `pagination-container
                  ${ slidesRootClassName || '' }
                  ${ this.state.containerOnHover ? 'hovered' : '' }`
                }
              >
                {
                  chunksLength > 1 && _times(chunksLength, index => (
                    <div
                      className={`slide-point ${ index === activeSlideIndex ? 'active' : '' }`}
                      key={index}
                      onClick={this.setActiveIndex.bind(this, index)}
                    ></div>
                  ))
                }
              </div>
          }
          {
            allItemsLink && allItemsText &&
              <Link to={allItemsLink} className="g-all-items-link">
                {allItemsText}
              </Link>
          }
          {
            withArrows &&
              <div className={arrowsMidle ? 'arrows-wrapper-midle' : 'arrows-wrapper'}>
                <PrewArrow
                  onClick={this.arrowLeftClick.bind(this, isTeam)}
                  style={arrowStyle}
                  hoverColor={'#1e9df2'}
                />
                <NextArrow
                  onClick={this.arrowRightClick.bind(this, isTeam)}
                  style={arrowStyle}
                  hoverColor={'#1e9df2'}
                />
              </div>
          }
        </div>
      </div>
    );
  }
}