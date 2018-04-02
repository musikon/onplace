if (global.IS_BROWSER) {
  require('./TeamMemberCard.styl'); // eslint-disable-line global-require
}

import React, {
  Component,
  PropTypes as Type,
} from 'react';

export default class TeamMemberCard extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    data: Type.object,
    isMobile: Type.bool
  };

  constructor() {
    super();

    this.state = {
      overlay: false,
      overlayLeftPosition: 0,
      overlayTopPosition: 0
    };

    this.onMouseEnter = ::this.onMouseEnter;
  }

  onMouseEnter(event) {
    const cursorXPosition = event.nativeEvent.clientX;
    const cursorYPosition = event.nativeEvent.clientY;

    this.setOverlayPositionByCursorCoords(cursorXPosition, cursorYPosition);
  }

  onMouseLeave(event) {
    const cursorXPosition = event.nativeEvent.clientX;
    const cursorYPosition = event.nativeEvent.clientY;

    this.setOverlayPositionByCursorCoords(cursorXPosition, cursorYPosition);
  }

  setOverlayPositionByCursorCoords(cursorXPosition, cursorYPosition) {
    const cardLeftOffset = this.cardContainer.getBoundingClientRect().left;
    const cardTopOffset = this.cardContainer.getBoundingClientRect().top;

    this.setState({
      overlayLeftPosition: `${ cursorXPosition - cardLeftOffset }px`,
      overlayTopPosition: `${ cursorYPosition - cardTopOffset }px`
    });
  }

  /**
   * Renders 'TeamMemberCard' component
   */
  render() {
    const {
      data,
      isMobile
    } = this.props;

    const {
      overlay,
      overlayLeftPosition,
      overlayTopPosition
    } = this.state;

    return (
      <div className="c-team-member-card-root">
        <div
          className="card-wrapper"
          onClick={isMobile ? () => this.setState({ overlay: !overlay }) : () => {}}
          onMouseEnter={::this.onMouseEnter}
          onMouseLeave={::this.onMouseLeave}
        >
          <div
            ref={cardContainer => (this.cardContainer = cardContainer)}
            className={`card ${ isMobile ? 'is-mobile ' : 'is-desktop ' } ${ overlay ? 'with-overlay' : '' }`}
          >
            <div className="card-front">
              <div
                className="front-overlay"
                style={{
                  left: overlayLeftPosition,
                  top: overlayTopPosition
                }}
              >
                <div className="front-overlay-inner"></div>
              </div>
              <div className="photo-container">
                <img
                  src={data.photo}
                  alt={data.name}
                />
              </div>
              <div className="info-text-container">
                <div className="main-text-container">
                  <span className="large-text">
                    {data.infoLargeText}
                  </span>
                  <span className={`middle-text ${ data.sub ? 'sub' : '' }`}>
                    {data.infoMiddleText}
                  </span>
                </div>
                <div className="small-text">
                  {data.infoSmallText}
                </div>
                <div className="name">
                  {data.name}
                </div>
                <div className="position">
                  {data.position}
                </div>
              </div>
            </div>
            <div className="card-back">
              <div className="back-text-container">
                <div className="name">
                  {data.name}
                </div>
                <div className="position">
                  {data.position}
                </div>
                <div className="age">
                  {data.age}
                </div>
                <div
                  className="description"
                  dangerouslySetInnerHTML={{ __html: data.description }}
                ></div>
                <div className="socials">
                  {
                    data.socials && data.socials.map((item, index) => (
                      <a
                        key={index}
                        href={item.link}
                        target="_blank"
                      >
                        <div className={`social-icons social-${ item.type }`} />
                      </a>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
