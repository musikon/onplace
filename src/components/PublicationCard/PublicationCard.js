if (global.IS_BROWSER) {
  require('./PublicationCard.styl'); // eslint-disable-line global-require
}

import React, {
  Component,
  PropTypes as Type,
} from 'react';

export default class PublicationCard extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    data: Type.object
  };

  /**
   * Renders 'PublicationCard' component
   */
  render() {
    const {
      data
    } = this.props;

    return (
      <div
        className="c-publication-card-root"
      >
        <a
          rel="dns-prefetch"
          href={data.url}
          target="_blank"
          className="publication-item"
        >
          <div
            className="publication-item-image-container"
            style={{ backgroundColor: data.color }}
          >
            <div className="image-container">
              <img
                className="publication-item-image"
                src={data.logo}
                alt={data.title}
              />
            </div>
          </div>
          <div className="publication-item-container">
            <div className="publication-title">
              {data.title}
            </div>
            <div className="publication-description">
              {data.description}
            </div>
            <span className="publication-read-more">
              <img
                src="/images/open-in-new-window-icon.svg"
                alt={data.title}
              />
            </span>
          </div>
        </a>
      </div>
    );
  }
}
