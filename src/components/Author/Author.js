if (global.IS_BROWSER) {
  require('./Author.styl'); // eslint-disable-line global-require
}

import React, {
  Component,
  PropTypes as Type,
} from 'react';

export default class Author extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    aboutItemsHead: Type.object,
    lang: Type.string
  };

  static defaultProps = {
    lang: 'ru'
  };

  /**
   * Renders 'Author' component
   */
  render() {
    const {
      aboutItemsHead = {},
      lang
    } = this.props;

    const isRUS = lang === 'ru';

    return (
      <div className="c-author">
        <div className="about-head-two-wrapper">
          <div className="about-author-container">
            <div className="about-author-avatar">
              <img alt="avatar" src={aboutItemsHead.authorUrl} />
            </div>

            <div className="info-author-block">
              <span className="author-title">
                {isRUS ? 'Автор проекта' : 'Project author'}
              </span>
              <span className="author-name">{aboutItemsHead.authorName}</span>
              <p className="author-position">{aboutItemsHead.authorPosition}</p>
            </div>
          </div>

          <div className="about-info-author">
            <div className={`about-social ${ !aboutItemsHead.social ? 'hidden' : '' }`} >
              {aboutItemsHead.websiteLink ? (
                <a className="link" href={aboutItemsHead.websiteLink}>{aboutItemsHead.websiteLink}</a>
              ) : ''}
              <div className="social-block">
                {aboutItemsHead.socialFb ? (
                  <a className="about-fb" href={aboutItemsHead.socialFb}>
                    <img alt="social" src="/images/facebook.svg" />
                  </a>
                ) : ''}
                {aboutItemsHead.socialVk ? (
                  <a className="about-vk" href={aboutItemsHead.socialVk}>
                    <img alt="social" src="/images/vk.svg" />
                  </a>
                ) : ''}
                {aboutItemsHead.socialTw ? (
                  <a className="about-tw" href={aboutItemsHead.socialTw}>
                    <img alt="social" src="/images/twitter.svg" />
                  </a>
                ) : ''}
                {aboutItemsHead.socialIns ? (
                  <a className="about-tw" href={aboutItemsHead.socialIns}>
                    <img alt="social" src="/images/instagram.svg" />
                  </a>
                ) : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
