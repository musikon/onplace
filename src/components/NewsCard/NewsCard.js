if (global.IS_BROWSER) {
  require('./NewsCard.styl'); // eslint-disable-line global-require
}

import {
  formatDate
} from '../../utils';

import { Link } from 'react-router';

import React, {
  Component,
  PropTypes as Type,
} from 'react';

export default class NewsCard extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    data: Type.object,
    vertical: Type.bool,
    withImage: Type.bool,
    lang: Type.string
  };

  /**
   * Initial props value
   */
  static defaultProps = {
    vertical: false,
    withImage: false
  }

  /**
   * Renders 'NewsCard' component
   */
  render() {
    const {
      data,
      withImage,
      lang,
      vertical
    } = this.props;

    return (
      <div className={`c-news-card-root ${ withImage ? 'with-image' : '' } ${ vertical ? 'vertical' : '' } `}>
        <Link
          to={`/${ lang }/news/${ data.id }`}
          style={{ backgroundColor: withImage ? 'gray' : 'white' }}
          className={`news-item ${ withImage ? 'with-image' : '' }`}
        >
          {
            withImage &&
              <div className="news-item-image-container">
                <img
                  className="news-item-image"
                  src={data.image}
                  alt={data.title}
                />
              </div>
          }
          <div className="news-item-container">
            <div className="news-date">
              {formatDate(data.date, lang)}
            </div>
            <div className="news-title">
              {data.title}
            </div>
            <div className="news-description">
              {data.description}
            </div>
            <span className="news-read-more">
                читать целиком
            </span>
          </div>
        </Link>
      </div>
    );
  }
}
