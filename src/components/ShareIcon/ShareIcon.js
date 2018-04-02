if (global.IS_BROWSER) {
  require('./ShareIcon.styl'); // eslint-disable-line global-require
}

import {
  ShareButtons
} from 'react-share';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton
} = ShareButtons;

import React, {
  Component,
  PropTypes as Type,
} from 'react';

export default class ShareIcon extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    positioning: Type.string,
    lang: Type.string
  };

  /**
   * Configures initialized component instance
   */
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }
  /**
   * Toggle fab container
   */
  toggleShareIcon() {
    if (this.state.isOpen) {
      this.setState({ isOpen: false });
    } else {
      this.setState({ isOpen: true });
    }
  }
  /**
   * Renders 'ShareIcon' component
   */
  render() {
    const {
      isOpen
    } = this.state;

    const {
      positioning,
      lang
    } = this.props;

    const isRUS = lang === 'ru';

    /* eslint-disable */
    var shareUrl = '';
    if (global.IS_BROWSER) {
      shareUrl = window.location.href;
    }
    /* eslint-enable */
    return (
      <div className={`c-fab ${ isOpen ? 'open' : '' } ${ positioning === 'card' ? 'isInCard' : '' }`} >
        <div className="wrapper">
          <button className="share-icon-button" onClick={::this.toggleShareIcon}>
            <span className="share-icon">
              <span className="path line top"></span>
              <span className="path line bottom"></span>
              <span className="path joint top"></span>
              <span className="path joint middle"></span>
              <span className="path joint bottom"></span>
            </span>
          </button>
          <div className="fab-container">
            <h2>
              {isRUS ? 'Поделиться' : 'Share'}
            </h2>
            <ul className="list">
              <li>
                <GooglePlusShareButton
                  url={shareUrl}
                  className="fab-link"
                >
                  <span className="social-icon">
                    <img src="/images/icons/GoogleIcon.svg" alt="" />
                    Google+
                  </span>
                </GooglePlusShareButton>
              </li>
              <li>
                <FacebookShareButton
                  url={shareUrl}
                  className="fab-link"
                >
                  <span className="social-icon">
                    <img src="/images/icons/FacebookIcon.svg" alt="" />
                    Facebook
                  </span>
                </FacebookShareButton>
              </li>
              <li>
                <TwitterShareButton
                  url={shareUrl}
                  className="fab-link"
                >
                  <span className="social-icon">
                    <img src="/images/icons/TwitterIcon.svg" alt="" />
                    Twitter
                  </span>
                </TwitterShareButton>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
